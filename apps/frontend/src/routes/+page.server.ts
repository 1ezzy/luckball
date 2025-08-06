import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { addUserToWeek, beginWeek, endWeek, startActiveWeek } from '@luckball/game-logic';
import { redis } from '$lib/clients/redis-client';
import { drizzle } from '$lib/clients/drizzle-client';
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

	if (userData) {
		return { weekJoined: true, displayName: userData.displayName };
	} else {
		return { weekJoined: false, displayName: null };
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

		const result = await addUserToWeek(displayName, userId, redis, drizzle);

		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	},
	beginWeek: async () => {
		const result = await beginWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	startActiveWeek: async () => {
		const result = await startActiveWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	endWeek: async () => {
		const result = await endWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	}
};
