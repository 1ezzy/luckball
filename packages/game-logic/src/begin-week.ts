import { MatchupData } from '../../../apps/frontend/src/lib/types/valkey-types';
import { createEspnApiClient } from './api/espn-api';

export const beginWeek = async (valkey: any, drizzle: any, prevWeek = false) => {
	const espnApi = createEspnApiClient();
	const activeWeek = await espnApi.getActiveWeek();
	const currentWeek = prevWeek ? activeWeek.currentWeek - 1 : activeWeek.currentWeek;
	const seasonType = activeWeek.seasonType;

	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const prevWeekDataKey = `${seasonType}:week:${currentWeek - 1}:data`;

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

	const updatedMatchups = matchups.map((matchup: MatchupData) => {
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

	// get the previous week data
	const prevWeekData = await valkey.get(prevWeekDataKey);

	// create current week data
	const weekData = {
		lastWinningTeam: prevWeekData?.winningTeam ?? '',
		status: 'pending'
	};

	// save the results
	await valkey.set(weekDataKey, JSON.stringify(weekData));

	return { success: true, message: `Week ${currentWeek} started.` };
};
