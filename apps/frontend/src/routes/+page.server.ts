import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { addUserToWeek, beginWeek, endWeek, startActiveWeek } from '@luckball/game-logic';
import { redis } from '$lib/clients/redis-client';
import { drizzle } from '$lib/clients/drizzle-client';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const currentWeekRes = await fetch('/api/espn/activeWeek');
	const { currentWeek, seasonType } = await currentWeekRes.json();

	const userId = cookies.get('userId');
	const userDataRes = await fetch(`/api/redis/${seasonType}/week/${currentWeek}/users/${userId}`, {
		headers: {
			cookie: `userId=${userId}`
		}
	});
	const userData = await userDataRes.json();

	if (userData) {
		return { weekJoined: true, displayName: userData.displayName };
	} else {
		return { weekJoined: false, displayName: null };
	}
};

export const actions: Actions = {
	joinWeek: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const displayName = data.get('displayName')?.toString();

		if (!displayName) {
			return fail(400, { displayName, error: 'Display name is required' });
		}

		const weekDataRes = await fetch('/api/espn/activeWeek');
		const weekData = await weekDataRes.json();
		const weekNumber = weekData.currentWeek;
		const seasonType = weekData.seasonType;

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

		const result = await addUserToWeek(seasonType, weekNumber, displayName, userId, redis, drizzle);

		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	},
	beginWeek: async ({ fetch }) => {
		const weekDataRes = await fetch('/api/espn/activeWeek');
		const weekData = await weekDataRes.json();
		const weekNumber = weekData.currentWeek;
		const seasonType = weekData.seasonType;

		const result = await beginWeek(seasonType, weekNumber, redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	startActiveWeek: async ({ fetch }) => {
		const weekDataRes = await fetch('/api/espn/activeWeek');
		const weekData = await weekDataRes.json();
		const weekNumber = weekData.currentWeek;
		const seasonType = weekData.seasonType;

		const result = await startActiveWeek(seasonType, weekNumber, redis);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	endWeek: async ({ fetch }) => {
		const weekDataRes = await fetch('/api/espn/activeWeek');
		const weekData = await weekDataRes.json();
		const weekNumber = weekData.currentWeek;
		const seasonType = weekData.seasonType;

		const result = await endWeek(seasonType, weekNumber, redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	}
};
