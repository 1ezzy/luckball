import { createEspnApiClient } from './api/espn-api';

export const beginWeek = async (valkey: any, drizzle: any, prevWeek = false) => {
	const espnApi = createEspnApiClient(valkey);
	const activeWeek = await espnApi.getActiveWeek();
	const currentWeek = prevWeek ? activeWeek.currentWeek - 1 : activeWeek.currentWeek;
	const seasonType = activeWeek.seasonType;

	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const prevWeekDataKey = `${seasonType}:week:${currentWeek - 1}:data`;

	// get all matchups for the week
	const weekEvents = await espnApi.getWeekEvents(seasonType, currentWeek);
	const matchups = weekEvents.events.map((event: any) => event.shortName);
	if (matchups.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}

	// update valkey with new match data
	await valkey.del(`${seasonType}:week:${currentWeek}:matchups`);
	await valkey.lpush(`${seasonType}:week:${currentWeek}:matchups`, matchups);

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
