import { PUBLIC_ESPN_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, params }) {
	const weekNumber = params.weekNumber;
	const seasonType = params.seasonType;

	const weekInfoUrl: string = `${PUBLIC_ESPN_BASE_URL}/seasons/2025/types/${seasonType}/weeks/${weekNumber}`;

	// get list of events which contains urls
	const weekInfoRes = await fetch(weekInfoUrl);
	const weekInfoData = await weekInfoRes.json();

	return json(weekInfoData);
}
