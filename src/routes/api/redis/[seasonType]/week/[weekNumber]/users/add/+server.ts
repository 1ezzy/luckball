import { redis } from '$lib/clients/redis-client';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const weekNumber = params.weekNumber;
	const seasonType = params.seasonType;

	// get the user data from the request body
	const { displayName, userId } = await request.json();
	console.log(displayName, userId);
	if (!displayName || !userId) {
		return json({ error: 'displayName and userId are required' }, { status: 400 });
	}

	// check if there is an active round for the week
	const roundStatus = (await redis.get(`${seasonType}:week:${weekNumber}:status`)) as string;
	if (roundStatus) {
		const status = JSON.parse(roundStatus);
		// TODO: Use enums for status
		if (status.status === 'started' || status.status === 'completed') {
			return json({ error: 'Cannot join - round has already started' }, { status: 400 });
		}
	}

	// check if this user has already joined for the week
	const existingUser = await redis.hget(`${seasonType}:week:${weekNumber}:users`, userId);
	if (existingUser) {
		return json({ error: 'User already joined this week' }, { status: 409 });
	}

	// create user data
	const userData = {
		displayName,
		joinedAt: new Date().toISOString(),
		teamAssignment: null
	};

	// add user to Redis hash for this week
	await redis.hset(`${seasonType}:week:${weekNumber}:users`, {
		[userId]: JSON.stringify(userData)
	});

	return json({
		success: true,
		message: 'User joined successfully',
		userData
	});
};
