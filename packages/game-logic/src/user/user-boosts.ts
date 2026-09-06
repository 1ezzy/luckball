import type { ValkeyClient } from '@luckball/valkey-client';
import { WeekStatus } from '../types';
import { setUserProperty } from './user-properties';

export const setUserBoosts = async (boosts: string[], userId: string, valkey: ValkeyClient) => {
	if (!boosts || !userId) {
		return { success: false, message: 'boosts and userId are required' };
	}

	// create formatted boost data to set user property
	const formattedBoosts = {
		multiplier1Team: boosts[0],
		multiplier2Team: boosts[1],
		multiplier3Team: boosts[2]
	};

	// update property in Valkey hash
	await setUserProperty(userId, WeekStatus.InProgress, 'boosts', formattedBoosts, valkey);

	return { success: true, message: 'User boosts updated!' };
};
