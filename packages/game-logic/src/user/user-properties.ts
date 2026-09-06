import type { ValkeyClient } from '@luckball/valkey-client';
import { getActiveWeek } from '../week/active-week';
import { WeekStatus, type User } from '../types';

export const setUserProperty = async (
	userId: string,
	weekStatus: WeekStatus,
	propertyKey: keyof User,
	propertyValue: User[keyof User],
	valkey: ValkeyClient
) => {
	if (!userId) {
		return { success: false, message: 'userId is required' };
	}

	const { currentWeek, seasonType } = await getActiveWeek(valkey);

	// confirm the user has already joined for the week
	const existingUserString = await valkey?.hget(`${seasonType}:week:${currentWeek}:users`, userId);
	if (weekStatus === WeekStatus.InProgress && !existingUserString) {
		return { success: false, message: 'User hasnt joined this week' };
	}

	const existingUser = existingUserString ? (JSON.parse(existingUserString) as User) : ({} as User);

	// update the property with the new value in valkey
	await valkey?.hset(`${seasonType}:week:${currentWeek}:users`, userId, JSON.stringify({
		...existingUser,
		[propertyKey]: propertyValue
	}));

	return {
		success: true,
		message: `User property ${propertyKey} has been updated to: ${propertyValue}`
	};
};

export const getUserProperty = async (
	userId: string,
	propertyKey: keyof User,
	valkey: ValkeyClient
) => {
	if (!userId) {
		return { success: false, message: 'userId is required' };
	}

	const { currentWeek, seasonType } = await getActiveWeek(valkey);
	const userString = await valkey?.hget(`${seasonType}:week:${currentWeek}:users`, userId);
	if (!userString) {
		return { success: false, message: 'User not found' };
	}

	return (JSON.parse(userString) as User)[propertyKey];
};
