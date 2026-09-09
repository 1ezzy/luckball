import { schema, type DrizzleClient } from '@luckball/drizzle-client';
import type { ValkeyClient } from '@luckball/valkey-client';
import { eq } from 'drizzle-orm';
import { WeekStatus } from '../types';
import { getActiveWeek } from '../week/active-week';

export const updateUserDisplayName = async (
	updatedDisplayName: string,
	userId: string,
	valkey: ValkeyClient,
	drizzle: DrizzleClient
) => {
	if (!updatedDisplayName || !userId) {
		return { success: false, message: 'updatedDisplayName and userId are required' };
	}

	const { currentWeek, seasonType } = await getActiveWeek(valkey);

	// check if there is an active round for the week
	const roundDataString = await valkey?.get(`${seasonType}:week:${currentWeek}:data`);
	const roundData = JSON.parse(roundDataString ?? '');
	if (roundData) {
		if (roundData.status === WeekStatus.InProgress || roundData.status === WeekStatus.Ended) {
			return { success: false, message: 'Round has already started' };
		}
	}

	// confirm the user has already joined for the week
	const existingUser = await valkey?.hget(`${seasonType}:week:${currentWeek}:users`, userId);
	if (!existingUser) {
		return { success: false, message: 'User hasnt joined this week' };
	}

	// create updated user data
	const existingUserData = JSON.parse(existingUser);
	const updatedUserData = {
		...existingUserData,
		displayName: updatedDisplayName
	};

	// add user to Valkey hash for this week
	await valkey?.hset(
		`${seasonType}:week:${currentWeek}:users`,
		userId,
		JSON.stringify(updatedUserData)
	);

	// update user display name in Postgres
	await drizzle
		.update(schema.user_profile)
		.set({ displayName: updatedUserData.displayName, updatedAt: new Date() })
		.where(eq(schema.user_profile.userId, userId))
		.returning({ updatedDisplayName: schema.user_profile.displayName });

	return { success: true, message: 'User display name updated successfully!' };
};
