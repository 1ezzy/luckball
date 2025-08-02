import { redis } from '$lib/clients/redis-client';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const weekNumber = params.weekNumber;
	const seasonType = params.seasonType;
	const userId = params.userId;

	const user = await redis.hget(`${seasonType}:week:${weekNumber}:users`, userId);

	return json(user);
}
