import type { ValkeyClient } from '@luckball/valkey-client';
import { WeekStatus } from '../types';
import { getActiveWeek } from '../week/active-week';

export const removeUserFromWeek = async (userId: string, valkey: ValkeyClient) => {
	if (!userId) {
		return { success: false, message: 'userId is required' };
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

	// check if this user has already joined for the week
	const existingUser = await valkey?.hget(`${seasonType}:week:${currentWeek}:users`, userId);
	if (!existingUser) {
		return { success: false, message: 'User hasnt joined this week' };
	}

	// add user to Valkey hash for this week
	await valkey?.hdel(`${seasonType}:week:${currentWeek}:users`, userId);

	return { success: true, message: 'User joined successfully!' };
};
