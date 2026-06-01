import { createEspnApiClient } from './api/espn-api';

export const updateScores = async (valkey: any) => {
	const espnApi = createEspnApiClient();
	const activeWeek = await espnApi.getActiveWeek();
	const currentWeek = activeWeek.currentWeek;
	const seasonType = activeWeek.seasonType;

	// step 1: update matchups
	// get all matchups for the week
	const weekEvents = await espnApi.getWeekEvents(seasonType, currentWeek);
	const matchups = weekEvents.events.map((event: any) => {
		const team1 = event.shortName.split(' ')[0];
		const team2 = event.shortName.split(' ')[2];
		const teams: string[] = [team1, team2];
		return {
			event: event.shortName,
			id: event.id,
			date: event.date,
			teams: teams
		};
	});
	if (matchups.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}

	const matchupScores = await Promise.all(matchups.map((m: any) => espnApi.getMatchupScores(m.id)));
	const reversedMatchupScores = matchupScores.map((scores) => [...scores].reverse());

	const updatedMatchups = matchups.map((matchup: any, index: number) => ({
		...matchup,
		matchupScores: matchup.teams.map((team: string, i: number) => ({
			[team]: reversedMatchupScores[index][i]
		}))
	}));

	// update valkey with new match data
	await valkey.set(`${seasonType}:week:${currentWeek}:matchups`, JSON.stringify(updatedMatchups));

	// step 2: update week data
	const weekDataRaw = await valkey.get(`${seasonType}:week:${currentWeek}:data`);
	const weekData = JSON.parse(weekDataRaw);
	const nflTeamScores: Record<string, number> = {};

	// build a lookup of NFL team scores from matchups
	for (const matchup of updatedMatchups) {
		for (const scoreObj of matchup.matchupScores) {
			const [team, score] = Object.entries(scoreObj)[0];
			nflTeamScores[team] = score as number;
		}
	}

	// calculate total score for each user team
	const teamScores: Record<string, number> = {};
	for (const [teamKey, team] of Object.entries(weekData)) {
		if (!(team as any).nflTeams) continue;
		teamScores[teamKey] = (team as any).nflTeams.reduce(
			(sum: number, nflTeam: string) => sum + (nflTeamScores[nflTeam] ?? 0),
			0
		);
	}

	// find the best NFL team and their score
	let bestNflTeamName = '';
	let bestNflTeamScore = -Infinity;
	for (const [team, score] of Object.entries(nflTeamScores)) {
		if (score > bestNflTeamScore) {
			bestNflTeamName = team;
			bestNflTeamScore = score;
		}
	}

	const updatedWeekData = {
		team1: {
			...weekData.team1,
			totalScore: teamScores.team1
		},
		team2: { ...weekData.team2, totalScore: teamScores.team2 },
		status: weekData.status,
		bestNflTeam: { teamName: bestNflTeamName, teamScore: bestNflTeamScore }
	};
	await valkey.set(`${seasonType}:week:${currentWeek}:data`, JSON.stringify(updatedWeekData));

	return {
		success: true,
		message: `Scores for Week ${currentWeek} updated in Matchups and Week Data.`
	};
};
