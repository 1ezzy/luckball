import { uniqueId } from '@layerstack/utils';
import type { Actions } from '@sveltejs/kit';

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
