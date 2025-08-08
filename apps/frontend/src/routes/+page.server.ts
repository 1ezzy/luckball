import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { addUserToWeek } from '@luckball/game-logic';
import { redis } from '$lib/clients/redis-client';
import { espnApi } from '@luckball/game-logic/src/api/espn-api';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const { currentWeek, seasonType } = await espnApi.getActiveWeek();

	const userId = cookies.get('userId');
	const userDataRes = await fetch(
		`/api/redis/${seasonType.type}/week/${currentWeek}/users/${userId}`,
		{
			headers: {
				cookie: `userId=${userId}`
			}
		}
	);
	const userData = await userDataRes.json();

	const allUserDataRes = await fetch(`/api/redis/${seasonType.type}/week/${currentWeek}/users`);
	const allUserData = await allUserDataRes.json();

	const weekDataRes = await fetch(`/api/redis/${seasonType.type}/week/${currentWeek}/data`);
	const weekData = await weekDataRes.json();

	if (userData && userId) {
		return {
			weekJoined: true,
			displayName: userData.displayName,
			userData: allUserData,
			userId: userId,
			weekData: weekData
		};
	} else {
		return {
			weekJoined: false,
			displayName: null,
			userData: null,
			userId: null,
			weekData: weekData
		};
	}
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

		const result = await addUserToWeek(displayName, userId, redis);

		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	}
};
