import type { ValkeyClient } from '@luckball/valkey-client';
import { createEspnClientForEnv } from '../api/espn-client';
import { getActiveWeek } from './active-week';
import { WeekStatus } from '../types';
import type { Matchup, Team, WeekData } from '../types';
import type { EspnEvent } from '../api/espn-client.interface';

export const updateScores = async (valkey: ValkeyClient) => {
	const espnApi = createEspnClientForEnv();
	const { currentWeek, seasonType } = await getActiveWeek(valkey, espnApi);

	// step 1: update matchups
	// get all matchups for the week
	const weekEvents: { events: EspnEvent[]; teams: string[] } = await espnApi.getWeekEvents(
		seasonType,
		currentWeek
	);
	const matchups: Matchup[] = weekEvents.events.map((event: EspnEvent) => {
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

	const matchupScores = await Promise.all(
		matchups.map((matchup: Matchup) => espnApi.getMatchupScores(matchup.id))
	);
	const reversedMatchupScores = matchupScores.map((scores) => [...scores].reverse());

	const updatedMatchups = matchups.map((matchup: Matchup, index: number) => ({
		...matchup,
		matchupScores: matchup.teams.map((team: string, i: number) => ({
			[team]: reversedMatchupScores[index][i]
		}))
	}));

	// update valkey with new match data
	await valkey?.set(`${seasonType}:week:${currentWeek}:matchups`, JSON.stringify(updatedMatchups));

	// step 2: update week data
	const weekDataRaw = await valkey?.get(`${seasonType}:week:${currentWeek}:data`);
	const weekData: WeekData = JSON.parse(weekDataRaw ?? '');

	// build a lookup of NFL team scores from matchups
	const nflTeamScores: Record<string, number> = {};
	for (const matchup of updatedMatchups) {
		for (const scoreObj of matchup.matchupScores) {
			const [team, score] = Object.entries(scoreObj)[0];
			nflTeamScores[team] = score as number;
		}
	}

	// calculate total score for each user team
	const teamScores: Record<string, number> = {};
	for (const team of weekData.teams) {
		teamScores[team.name] = (team as Team).nflTeams.reduce(
			(sum: number, nflTeam: string) => sum + (nflTeamScores[nflTeam] ?? 0),
			0
		);
	}

	console.log(teamScores);

	// find the best NFL team and their score
	let bestNflTeamName = '';
	let bestNflTeamScore = -1;
	for (const [team, score] of Object.entries(nflTeamScores)) {
		if (score > bestNflTeamScore) {
			bestNflTeamName = team;
			bestNflTeamScore = score;
		}
	}

	const updatedWeekData: WeekData = {
		...weekData,
		teams: [
			{ ...weekData.teams[0], totalScore: teamScores[weekData.teams[0].name] },
			{ ...weekData.teams[1], totalScore: teamScores[weekData.teams[1].name] }
		],
		status: WeekStatus.InProgress,
		bestNflTeamName,
		bestNflTeamScore
	};
	await valkey?.set(`${seasonType}:week:${currentWeek}:data`, JSON.stringify(updatedWeekData));

	return {
		success: true,
		message: `Scores for Week ${currentWeek} updated in Matchups and Week Data.`
	};
};
