import { fail, redirect } from '@sveltejs/kit';
import { getMatchupData, getWeekAndUserData } from '$lib/server/valkey';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';
import { auth } from '$lib/auth/auth';
import type { PageServerLoad } from './$types';

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
	const currentUserData = userId ? { ...currentUserDataFromId, userId } : null;

	return {
		currentWeekText: currentWeekText,
		weekMatchups: matchupData,
		weekStatus: weekData?.status,
		weekJoined: currentUserData?.displayName,
		displayName: currentUserData?.displayName,
		userTeamAssignment: currentUserData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName,
		userTeamName: currentUserData?.teamAssignment
	};
};
