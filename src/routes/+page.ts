import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const currentWeekRes = await fetch('/api/espn/activeWeek');

	const { currentWeek, seasonType } = await currentWeekRes.json();
	const weekRes = await fetch(`/api/espn/${seasonType}/week/${currentWeek}`);

	const weekItem = await weekRes.json();

	return { weekItem };
};
