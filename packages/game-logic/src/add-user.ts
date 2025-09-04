import { createEspnApiClient } from './api/espn-api';
import { schema } from '@luckball/drizzle-client';
import { eq } from 'drizzle-orm';

export const addUserToWeek = async (
	displayName: string,
	userId: string,
	valkey: any,
	drizzle: any
) => {
	if (!displayName || !userId) {
		return { success: false, message: 'displayName and userId are required' };
	}

	const espnApi = createEspnApiClient();
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();

	// check if there is an active round for the week
	const roundData = await valkey.get(`${seasonType}:week:${currentWeek}:data`);
	if (roundData) {
		if (roundData.status === 'in_progress' || roundData.status === 'ended') {
			return { success: false, message: 'Round has already started' };
		}
	}

	// check if this user has already joined for the week
	const existingUser = await valkey.hget(`${seasonType}:week:${currentWeek}:users`, userId);
	if (existingUser) {
		return { success: false, message: 'User already joined this week' };
	}

	// create user data
	const userData = {
		displayName,
		joinedAt: new Date().toISOString(),
		teamAssignment: null
	};

	// add user to Valkey hash for this week
	await valkey.hset(`${seasonType}:week:${currentWeek}:users`, {
		[userId]: JSON.stringify(userData)
	});

	// update user display name in Postgres
	const updateResult = await drizzle
		.update(schema.user_profile)
		.set({ displayName, updatedAt: new Date() })
		.where(eq(schema.user_profile.userId, userId))
		.returning({ updatedDisplayName: schema.user_profile.displayName });

	// if user was not updated, create a new entry for the user
	if (updateResult.length === 0) {
		await drizzle.insert(schema.user_profile).values({
			userId,
			displayName,
			createdAt: new Date(),
			updatedAt: new Date(),
			totalWins: 0,
			totalLosses: 0
		});
	}

	return { success: true, message: 'User joined successfully!' };
};
