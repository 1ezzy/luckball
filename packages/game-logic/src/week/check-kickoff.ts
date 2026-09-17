import type { ValkeyClient } from '@luckball/valkey-client';
import { createEspnClientForEnv } from './../api/espn-client';
import { WeekStatus, type Matchup } from '../types';
import { getActiveWeek } from './active-week';
import { startActiveWeek } from './start-active-week';

const KICKOFF_BUFFER_MS = 60 * 60 * 1000;

export const checkAndStartActiveWeek = async (valkey: ValkeyClient, espnMock?: string) => {
	const espnApi = createEspnClientForEnv(espnMock);
	const { currentWeek, seasonType } = await getActiveWeek(valkey, espnApi);

	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const matchupsKey = `${seasonType}:week:${currentWeek}:matchups`;

	const currentWeekData = await valkey?.get(weekDataKey);
	if (!currentWeekData || JSON.parse(currentWeekData).status !== WeekStatus.Pending) {
		return { success: true, started: false, message: 'Week not pending - nothing to do.' };
	}

	const matchupsRaw = await valkey?.get(matchupsKey);
	if (!matchupsRaw) {
		return { success: false, started: false, message: 'No matchups found for the week.' };
	}
	const matchups: Matchup[] = JSON.parse(matchupsRaw);
	const earliestKickoff = Math.min(...matchups.map((matchup) => new Date(matchup.date).getTime()));

	if (Date.now() < earliestKickoff - KICKOFF_BUFFER_MS) {
		return { success: true, started: false, message: 'Not within an hour of kickoff yet.' };
	}

	const result = await startActiveWeek(valkey, espnMock);
	return { ...result, started: result.success };
};
