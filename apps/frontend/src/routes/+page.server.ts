import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const currentWeekRes = await fetch('/api/espn/activeWeek');
	const { currentWeek, seasonType } = await currentWeekRes.json();

	const userId = cookies.get('userId');
	const userDataRes = await fetch(`/api/redis/${seasonType}/week/${currentWeek}/users/${userId}`);
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
				httpOnly: false,
				secure: true,
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

		console.log(await response.json());
	}
};
