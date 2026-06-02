import { createEspnClient } from './api/espn-client';

export const beginWeek = async (valkey: any) => {
	const espnApi = createEspnClient();
	const activeWeek = await espnApi.getActiveWeek();
	const currentWeek = activeWeek.currentWeek;
	const seasonType = activeWeek.seasonType;

	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const prevWeekDataKey = `${seasonType}:week:${currentWeek - 1}:data`;

	const prevWeekData = await valkey.get(prevWeekDataKey);
	// if (JSON.parse(prevWeekData).status !== 'ended') {
	// 	return { success: false, message: 'Week not started - previous week data status not "ended"' };
	// }

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

	const updatedMatchups = matchups.map((matchup: any) => {
		const scoresObjList = matchup.teams.map((team: string) => ({
			[team]: 0
		}));
		return {
			...matchup,
			matchupScores: scoresObjList
		};
	});

	// update valkey with new match data
	await valkey.set(`${seasonType}:week:${currentWeek}:matchups`, JSON.stringify(updatedMatchups));

	// create current week data
	const newWeekData = {
		lastWinningTeam: prevWeekData?.winningTeamName ?? '',
		status: 'pending'
	};

	// save the results
	await valkey.set(weekDataKey, JSON.stringify(newWeekData));

	return { success: true, message: `Week ${currentWeek} started.` };
};
