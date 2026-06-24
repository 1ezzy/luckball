import type { ValkeyClient } from '@luckball/valkey-client';
import { getActiveWeek } from './active-week';
import type { User } from './types';

export const updateUserProperty = async (
	userId: string,
	propertyKey: keyof User,
	propertyValue: User[keyof User],
	valkey: ValkeyClient
) => {
	if (!userId) {
		return { success: false, message: 'userId is required' };
	}

	const { currentWeek, seasonType } = await getActiveWeek(valkey);
	await valkey?.hset(`${seasonType}:week:${currentWeek}:users`, {
		[userId]: {
			[propertyKey]: propertyValue
		}
	});

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
