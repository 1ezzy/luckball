import { fail, redirect } from '@sveltejs/kit';
import { getMatchupData, getWeekAndUserData } from '$lib/server/valkey';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';
import { auth } from '$lib/auth/auth';
import type { PageServerLoad } from './$types';
import { drizzle } from '$lib/clients/drizzle-client';
import { user_profile } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw redirect(307, '/login');
	}

	const userId = session?.user.id;
	if (!userId) {
		return fail(400, { userId, error: 'User ID is required' });
	}

	const espnApi = createEspnApiClient();
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();
	const matchupData = await getMatchupData(seasonType, currentWeek);

	const { weekData, allUserData } = await getWeekAndUserData(seasonType, currentWeek);
	if (!weekData || !allUserData) {
		return fail(500, { error: 'Could not load week data. Please try again later.' });
	}

	const currentUserDataFromId = userId
		? allUserData[userId]
			? JSON.parse(allUserData[userId] as string)
			: null
		: null;

	const userProfileResult = await drizzle
		.select({
			displayName: user_profile.displayName,
			totalWins: user_profile.totalWins,
			totalLosses: user_profile.totalLosses,
			highestScoringTeamName: user_profile.highestScoringTeamName,
			highestScoringTeamScore: user_profile.highestScoringTeamScore
		})
		.from(user_profile)
		.where(eq(user_profile.userId, userId));

	const prevDisplayName = userProfileResult[0]?.displayName;
	const totalWins = userProfileResult[0]?.totalWins;
	const totalLosses = userProfileResult[0]?.totalLosses;
	const highestScoringTeamName = userProfileResult[0]?.highestScoringTeamName;
	const highestScoringTeamScore = userProfileResult[0]?.highestScoringTeamScore;

	const currentUserData = userId
		? {
				...currentUserDataFromId,
				userId,
				prevDisplayName: prevDisplayName,
				totalWins: totalWins,
				totalLosses: totalLosses,
				highestScoringTeamName: highestScoringTeamName,
				highestScoringTeamScore: highestScoringTeamScore
			}
		: null;

	return {
		currentWeekText: currentWeekText,
		weekMatchups: matchupData,
		weekStatus: weekData?.status,
		weekJoined: currentUserData?.displayName,
		displayName: currentUserData?.displayName,
		userTeamAssignment: currentUserData?.teamAssignment,
		userTeamName: currentUserData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName,
		totalWins: currentUserData?.totalWins,
		totalLosses: currentUserData?.totalLosses,
		highestScoringTeamName: currentUserData?.highestScoringTeamName,
		highestScoringTeamScore: currentUserData?.highestScoringTeamScore
	};
};
