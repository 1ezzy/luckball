import { espnApi } from '@luckball/game-logic/src/api/espn-api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const { currentWeek, seasonType } = await espnApi.getActiveWeek();
	const type = seasonType.type;

	const weekEvents = await espnApi.getWeekEvents(type, currentWeek);

	const displayName = data.displayName;
	const userData = data.userData;
	const userId = data.userId;
	const weekJoined = data.weekJoined;
	const weekData = data.weekData;
	return { weekEvents, currentWeek, type, displayName, userData, userId, weekJoined, weekData };
};
