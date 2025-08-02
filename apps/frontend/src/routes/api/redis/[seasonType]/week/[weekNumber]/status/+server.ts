import { redis } from '$lib/clients/redis-client';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const weekNumber = params.weekNumber;
	const seasonType = params.seasonType;

	const users = await redis.hgetall(`${seasonType}:week:${weekNumber}:status`);

	return json(users);
}
