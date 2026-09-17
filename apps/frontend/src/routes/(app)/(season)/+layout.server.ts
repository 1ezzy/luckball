import { error } from '@sveltejs/kit';
import { createEspnClientForEnv } from '@luckball/game-logic';
import { schema } from '@luckball/drizzle-client';
import { eq } from 'drizzle-orm';
import { drizzle } from '$lib/clients/drizzle-client';
import { valkey } from '$lib/clients/valkey-client';
import { getMatchup, getWeekAndUserData } from '$lib/server/valkey';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { userId } = await parent();
	const espnApi = createEspnClientForEnv();

	// get data for the active NFL week from ESPN
	let activeWeek;
	const activeWeekCacheKey = 'espn:active-week';
	const cachedActiveWeek = await valkey?.get(activeWeekCacheKey);
	if (cachedActiveWeek) {
		activeWeek = JSON.parse(cachedActiveWeek);
	} else {
		try {
			activeWeek = await espnApi.getActiveWeek();
			await valkey?.set(activeWeekCacheKey, JSON.stringify(activeWeek), 'EX', 1800);
		} catch {
			throw error(503, 'Could not reach the ESPN API. Please try again later.');
		}
	}

	// using active week data, retrieve the current week, current week text (i.e., "Week 11", "Preseason Week 1")
	const { currentWeek, currentWeekText, seasonType } = activeWeek;
	const weekEventsCacheKey = `espn:week-events:${seasonType}:${currentWeek}`;
	const [{ weekData, allUserGameData }, matchupData, weekEvents] = await Promise.all([
		getWeekAndUserData(seasonType, currentWeek),
		getMatchup(seasonType, currentWeek),
		(async () => {
			const cached = await valkey?.get(weekEventsCacheKey);
			if (cached) return JSON.parse(cached);

			const fresh = await espnApi.getWeekEvents(seasonType, currentWeek);
			await valkey?.set(weekEventsCacheKey, JSON.stringify(fresh), 'EX', 300); // 5 min TTL
			return fresh;
		})()
	]);

	if (!weekData || !allUserGameData || !matchupData) {
		throw error(500, 'Could not load page data. Please try again later.');
	}

	// get user data for the game/week
	const currentUserGameDataFromId = allUserGameData[userId]
		? JSON.parse(allUserGameData[userId] as string)
		: null;

	// then get the user profile data from the postgres database
	const userProfileResult = await drizzle
		.select({
			displayName: schema.user_profile.displayName,
			totalWins: schema.user_profile.totalWins,
			totalLosses: schema.user_profile.totalLosses,
			highestScoringTeamName: schema.user_profile.highestScoringTeamName,
			highestScoringTeamScore: schema.user_profile.highestScoringTeamScore
		})
		.from(schema.user_profile)
		.where(eq(schema.user_profile.userId, userId));

	// aggregate user profile data into an object to return for the page
	const userProfileData = {
		prevDisplayName: userProfileResult[0]?.displayName,
		totalWins: userProfileResult[0]?.totalWins,
		totalLosses: userProfileResult[0]?.totalLosses,
		highestScoringTeamName: userProfileResult[0]?.highestScoringTeamName,
		highestScoringTeamScore: userProfileResult[0]?.highestScoringTeamScore
	};

	return {
		userId,
		currentWeek,
		currentWeekText,
		seasonType,
		weekData,
		matchupData,
		allUserGameData,
		currentUserGameDataFromId,
		userProfileData,
		weekEvents
	};
};
