import { error } from '@sveltejs/kit';
import { createEspnApiClient } from '@luckball/game-logic';
import { getMatchupData, getWeekAndUserData } from '$lib/server/valkey';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { userId } = await parent();
	const espnApi = createEspnApiClient();

	let activeWeek;
	try {
		activeWeek = await espnApi.getActiveWeek();
	} catch {
		throw error(503, 'Could not reach the ESPN API. Please try again later.');
	}

	const { currentWeek, currentWeekText, seasonType } = activeWeek;
	const [{ weekData, allUserData }, matchupData] = await Promise.all([
		getWeekAndUserData(seasonType, currentWeek),
		getMatchupData(seasonType, currentWeek)
	]);

	if (!weekData || !allUserData || !matchupData) {
		throw error(500, 'Could not load page data. Please try again later.');
	}

	const currentUserDataFromId = allUserData[userId]
		? JSON.parse(allUserData[userId] as string)
		: null;

	return {
		userId,
		espnApi,
		currentWeek,
		currentWeekText,
		seasonType,
		weekData,
		matchupData,
		allUserData,
		currentUserDataFromId
	};
};
