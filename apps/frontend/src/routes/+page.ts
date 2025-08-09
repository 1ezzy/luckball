import { EspnApiClient } from '@luckball/game-logic/src/api/espn-api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, fetch }) => {
	const espnApi = new EspnApiClient(fetch);

	const weekJoined = data.weekJoined;
	const displayName = data.displayName;
	const userId = data.userId;
	const team1Data = data.team1Data;
	const team2Data = data.team2Data;
	const teamName = data.teamName;
	const seasonType = data.seasonType;
	const currentWeek = data.currentWeek;
	const weekStatus = data.weekStatus;

	const weekEvents = await espnApi.getWeekEvents(seasonType.type, currentWeek);

	return {
		weekEvents,
		weekJoined,
		displayName,
		userId,
		team1Data,
		team2Data,
		teamName,
		seasonType,
		currentWeek,
		weekStatus
	};
};
