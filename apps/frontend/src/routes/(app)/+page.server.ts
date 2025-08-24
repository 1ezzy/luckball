import { fail, redirect, type Actions } from '@sveltejs/kit';
import { addUserToWeek } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
import { drizzle } from '$lib/clients/drizzle-client';
import { getMatchupData, getWeekAndUserData } from '$lib/server/valkey';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';
import { auth } from '$lib/auth/auth';
import type { PageServerLoad } from './$types';
import { user_profile } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session) {
		throw redirect(307, '/login');
	}

	const getTeamWithUsernames = (team: { players: string[] }, allUsers: Record<string, string>) => {
		if (!team || !allUsers || !team.players) return { ...team, usernames: [] };
		const usernames = team.players.map((id) => {
			if (!allUsers[id]) return [];
			return JSON.parse(allUsers[id])?.displayName;
		});
		return { ...team, usernames };
	};

	const userId = session?.user.id;
	if (!userId) {
		return fail(400, { userId, error: 'User ID is required' });
	}

	const espnApi = createEspnApiClient();
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();

	const [{ weekData, allUserData }, weekEvents] = await Promise.all([
		getWeekAndUserData(seasonType, currentWeek),
		espnApi.getWeekEvents(seasonType, currentWeek)
	]);
	if (!weekData || !allUserData || !weekEvents) {
		return fail(500, { error: 'Could not load week data. Please try again later.' });
	}

	const matchupData = await getMatchupData(seasonType, currentWeek);

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
	const team1Data = getTeamWithUsernames(weekData?.team1, allUserData);
	const team2Data = getTeamWithUsernames(weekData?.team2, allUserData);

	const currentWeekData = {
		seasonType: seasonType,
		currentWeekNum: currentWeek,
		currentWeekText: currentWeekText,
		weekEvents: weekEvents,
		weekMatchups: matchupData,
		weekStatus: weekData.status,
		lastWinningTeam: weekData.lastWinningTeam,
		winningTeamName: weekData.winningTeamName,
		winningTeamScore: weekData.winningTeamScore,
		bestNflTeamName: weekData.bestNflTeamName,
		bestNflTeamScore: weekData.bestNflTeamScore
	};

	const teamData = {
		team1: team1Data,
		team2: team2Data
	};

	return {
		currentWeekData,
		currentUserData,
		teamData
	};
};

export const actions: Actions = {
	joinWeek: async ({ request }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});
		const userId = session?.user.id;
		if (!userId) {
			return fail(400, { userId, error: 'User ID is required' });
		}

		const data = await request.formData();
		const displayName = data.get('displayName')?.toString();
		if (!displayName) {
			return fail(400, { displayName, error: 'Display name is required' });
		}

		const result = await addUserToWeek(displayName, userId, valkey, drizzle);
		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	}
};
