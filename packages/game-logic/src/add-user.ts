import { createEspnApiClient } from './api/espn-api';

export const addUserToWeek = async (displayName: string, userId: string, redis: any) => {
	if (!displayName || !userId) {
		return { success: false, message: 'displayName and userId are required' };
	}

	const espnApi = createEspnApiClient(redis);
	const { currentWeek, seasonType } = await espnApi.getActiveWeek();

	// check if there is an active round for the week
	const roundData = await redis.get(`${seasonType.type}:week:${currentWeek}:data`);
	if (roundData) {
		if (roundData.status === 'in_progress' || roundData.status === 'ended') {
			return { success: false, message: 'Round has already started' };
		}
	}

	// check if this user has already joined for the week
	const existingUser = await redis.hget(`${seasonType.type}:week:${currentWeek}:users`, userId);
	if (existingUser) {
		return { success: false, message: 'User already joined this week' };
	}

	// create user data
	const userData = {
		displayName,
		joinedAt: new Date().toISOString(),
		teamAssignment: null
	};

	// add user to Redis hash for this week
	await redis.hset(`${seasonType.type}:week:${currentWeek}:users`, {
		[userId]: JSON.stringify(userData)
	});

	return { success: true, message: 'User joined successfully!' };
};
