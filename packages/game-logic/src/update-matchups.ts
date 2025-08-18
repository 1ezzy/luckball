import { createEspnApiClient } from './api/espn-api';

export const updateMatchups = async (valkey: any) => {
	const espnApi = createEspnApiClient();
	const activeWeek = await espnApi.getActiveWeek();
	const currentWeek = activeWeek.currentWeek;
	const seasonType = activeWeek.seasonType;

	// get all matchups for the week
	const weekEvents = await espnApi.getWeekEvents(seasonType, currentWeek);
	const matchups = weekEvents.events.map((event: any) => {
		const team1 = event.shortName.split(' ')[0];
		const team2 = event.shortName.split(' ')[2];
		const teams: string[] = [team1, team2];
		return JSON.stringify({
			event: event.shortName,
			id: event.id,
			date: event.date,
			teams: teams
		});
	});
	if (matchups.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}

	const matchupScores: number[][] = [];
	for (let i = 0; i < matchups.length; i++) {
		const matchup = JSON.parse(matchups[i]);
		const matchupScoreList = await espnApi.getMatchupScores(matchup.id, matchup.startingIndex);
		matchupScores.push(matchupScoreList.reverse());
	}

	const updatedMatchups = matchups.map((matchup: string, idx: number) => {
		const matchupObj = JSON.parse(matchup);
		return JSON.stringify({
			...matchupObj,
			score: matchupScores[idx]
		});
	});

	// update valkey with new match data
	await valkey.del(`${seasonType}:week:${currentWeek}:matchups`);
	await valkey.lpush(`${seasonType}:week:${currentWeek}:matchups`, updatedMatchups);

	return { success: true, message: `Matchups for Week ${currentWeek} updated.` };
};
