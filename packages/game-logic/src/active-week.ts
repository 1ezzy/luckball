import type { ValkeyClient } from '@luckball/valkey-client';
import type { IEspnClient } from './api/espn-client.interface';

export const ACTIVE_WEEK_KEY = 'game:active-week';

export interface ActiveWeek {
	currentWeek: number;
	currentWeekText: string;
	seasonType: number;
}

export const getActiveWeek = async (
	valkey: ValkeyClient,
	espnFallback?: IEspnClient
): Promise<ActiveWeek> => {
	const cached = await valkey?.get(ACTIVE_WEEK_KEY);
	if (cached) return JSON.parse(cached) as ActiveWeek;
	if (espnFallback) return espnFallback.getActiveWeek();
	throw new Error('Active week not found in Valkey. Run beginWeek first.');
};
