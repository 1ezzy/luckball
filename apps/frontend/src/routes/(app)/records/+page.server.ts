import { fail, redirect, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { addUserToWeek } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
import { getMatchupData, getWeekAndUserData } from '$lib/server/valkey';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';
import { auth } from '$lib/auth/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	// Redirect to login if no session exists
	if (!session) {
		throw redirect(307, '/login');
	}

	const userId = cookies.get('userId');

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
		userTeamName: currentUserData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName
	};
};

export const actions: Actions = {
	joinWeek: async ({ request, cookies }) => {
		const data = await request.formData();
		const displayName = data.get('displayName')?.toString();

		if (!displayName) {
			return fail(400, { displayName, error: 'Display name is required' });
		}

		let userId = cookies.get('userId');
		if (!userId) {
			userId = crypto.randomUUID();
			cookies.set('userId', userId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				secure: !dev,
				sameSite: 'strict'
			});
		}

		const result = await addUserToWeek(displayName, userId, valkey);
		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	}
};
