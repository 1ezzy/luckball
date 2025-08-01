import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const weekRes = await fetch('/api/espn/week/1');

	const weekItem = await weekRes.json();

	return { weekItem };
};
