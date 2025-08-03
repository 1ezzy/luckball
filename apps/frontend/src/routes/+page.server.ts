import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';

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
		const displayName = data.get('displayName');

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

		const response = await fetch(`/api/redis/${seasonType}/week/${weekNumber}/users/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				displayName: displayName,
				userId: userId
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			return fail(response.status, { displayName, error: errorData.error });
		}

		return { success: true };
	}
};
