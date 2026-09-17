import type { ValkeyClient } from '@luckball/valkey-client';
import { WeekStatus, type Boost } from '../types';
import { setUserProperty } from './user-properties';

export const setUserBoosts = async (boosts: Boost[], userId: string, valkey: ValkeyClient) => {
	if (!boosts || !userId) {
		return { success: false, message: 'boosts and userId are required' };
	}

	// update property in Valkey hash
	await setUserProperty(userId, WeekStatus.InProgress, 'boosts', boosts, valkey);

	return { success: true, message: 'User boosts updated!' };
};
