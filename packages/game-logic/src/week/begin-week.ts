import type { ValkeyClient } from '@luckball/valkey-client';
import { createEspnClientForEnv } from './../api/espn-client';
import { WeekStatus } from '../types';
import { ACTIVE_WEEK_KEY } from './active-week';

export const beginWeek = async (valkey: ValkeyClient) => {
	const espnApi = createEspnClientForEnv();
	const activeWeek = await espnApi.getActiveWeek();
	const { currentWeek, seasonType } = activeWeek;

	await valkey?.set(ACTIVE_WEEK_KEY, JSON.stringify(activeWeek));

	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const prevWeekDataKey = `${seasonType}:week:${currentWeek - 1}:data`;

	let prevWeekData: string = '';
	if (valkey && currentWeek && currentWeek > 1) {
		prevWeekData = (await valkey?.get(prevWeekDataKey)) ?? '';
	}

	// get all matchups for the week
	const weekEvents = await espnApi.getWeekEvents(seasonType, currentWeek);
	const matchups = weekEvents.events.map((event) => {
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

	const updatedMatchups = matchups.map((matchup) => {
		const scoresObjList = matchup.teams.map((team: string) => ({
			[team]: 0
		}));
		return {
			...matchup,
			matchupScores: scoresObjList
		};
	});

	// update valkey with new match data
	await valkey?.set(`${seasonType}:week:${currentWeek}:matchups`, JSON.stringify(updatedMatchups));

	// create current week data
	const lastWinningTeam = prevWeekData ? JSON.parse(prevWeekData).winningTeamName : '';
	const newWeekData = {
		lastWinningTeam: lastWinningTeam,
		status: WeekStatus.Pending
	};

	// save the results
	await valkey?.set(weekDataKey, JSON.stringify(newWeekData));

	return { success: true, message: `Week ${currentWeek} started.` };
};
