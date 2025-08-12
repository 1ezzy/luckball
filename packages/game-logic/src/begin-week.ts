import { createEspnApiClient } from './api/espn-api';

export const beginWeek = async (redis: any, drizzle: any, prevWeek = false) => {
	const espnApi = createEspnApiClient(redis);
	const activeWeek = await espnApi.getActiveWeek();
	const currentWeek = prevWeek ? activeWeek.currentWeek - 1 : activeWeek.currentWeek;
	const seasonType = activeWeek.seasonType;

	const weekDataKey = `${seasonType.type}:week:${currentWeek}:data`;
	const prevWeekDataKey = `${seasonType.type}:week:${currentWeek - 1}:data`;

	// get all matchups for the week
	const weekEvents = await espnApi.getWeekEvents(seasonType.type, currentWeek);
	const matchups = weekEvents.events.map((event: any) => event.shortName);
	if (matchups.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}

	// update redis with new match data
	await redis.del(`${seasonType.type}:week:${currentWeek}:matchups`);
	await redis.lpush(`${seasonType.type}:week:${currentWeek}:matchups`, ...matchups);

	// get the previous week data
	const prevWeekData = await redis.get(prevWeekDataKey);

	// create current week data
	const weekData = {
		lastWinningTeam: prevWeekData?.winningTeam ?? '',
		status: 'pending'
	};

	// save the results
	await redis.set(weekDataKey, JSON.stringify(weekData));

	return { success: true, message: `Week ${currentWeek} started.` };
};
