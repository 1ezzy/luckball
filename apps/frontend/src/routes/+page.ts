import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	const currentWeekRes = await fetch('/api/espn/activeWeek');
	const { currentWeek, seasonType } = await currentWeekRes.json();

	const weekEventsRes = await fetch(`/api/espn/${seasonType}/week/${currentWeek}/events`);
	const weekEvents = await weekEventsRes.json();

	const displayName = data.displayName;
	const weekJoined = data.weekJoined;
	return { weekEvents, currentWeek, seasonType, displayName, weekJoined };
};
