import { redis } from '$lib/clients/redis-client';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const weekNumber = params.weekNumber;
	const seasonType = params.seasonType;

	const data = await redis.get(`${seasonType}:week:${weekNumber}:data`);

	return json(data);
}
