import { PUBLIC_ESPN_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, params }) {
	const eventListUrl: string = `${PUBLIC_ESPN_BASE_URL}/seasons/2025/types/2/weeks/${params.weekNumber}/events`;

	// get list of events which contains urls
	const eventListRes = await fetch(eventListUrl);
	const eventListData = await eventListRes.json();

	// get the list of urls
	const eventPromises = eventListData.items.map((event: { $ref: string }) => fetch(event.$ref));
	const eventResponses = await Promise.all(eventPromises);

	// get the promises and await
	const eventParsingPromises = eventResponses.map((res) => res.json());
	const events = await Promise.all(eventParsingPromises);

	const teams = events.flatMap((event) => {
		const nameParts = event.shortName.split(' ');
		return [nameParts[0], nameParts[2]];
	});

	return json({ events, teams });
}
