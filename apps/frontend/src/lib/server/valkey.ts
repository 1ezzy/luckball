import { valkey } from '$lib/clients/valkey-client';
import type { AllUsersData, MatchupData, User, WeekData } from '@luckball/game-logic';

export async function getWeekAndUserData(
	seasonType: string,
	week: number
): Promise<{ weekData: WeekData | null; allUserGameData: AllUsersData | null }> {
	const weekDataKey = `${seasonType}:week:${week}:data`;
	const allUsersDataKey = `${seasonType}:week:${week}:users`;

	const results = await valkey?.multi().get(weekDataKey).hgetall(allUsersDataKey).exec();
	if (!results) {
		return { weekData: null, allUserGameData: null };
	}

	const weekDataRes = results[0][1] as string;
	const weekData = weekDataRes ? (JSON.parse(weekDataRes) as WeekData) : null;

	const allUserGameData = results[1][1] as Record<string, string> | null;
	if (!allUserGameData) {
		return { weekData, allUserGameData: null };
	}

	return { weekData, allUserGameData };
}

export async function getWeekData(
	seasonType: string,
	week: number
): Promise<{ weekData: WeekData }> {
	const weekDataKey = `${seasonType}:week:${week}:data`;
	const weekDataString = await valkey?.get(weekDataKey);
	const weekData = weekDataString ? JSON.parse(weekDataString as string) : null;

	return { weekData };
}

export async function getAllUsersData(
	seasonType: string,
	week: number
): Promise<{ allUsersData: AllUsersData | null }> {
	const userDataKey = `${seasonType}:week:${week}:users`;
	const usersDataHash = await valkey?.hgetall(userDataKey);

	if (!usersDataHash) {
		return { allUsersData: null };
	}

	const allUsersData = Object.fromEntries(
		Object.entries(usersDataHash).map(([key, value]) => [key, JSON.parse(value as string)])
	) as AllUsersData;

	return { allUsersData };
}

export async function getUserDataById(
	seasonType: string,
	week: number,
	userId: string
): Promise<{ userData: User }> {
	const userDataKey = `${seasonType}:week:${week}:users`;
	const userDataString = await valkey?.hget(userDataKey, userId);
	const userData = userDataString ? JSON.parse(userDataString as string) : null;
	return { userData };
}

export async function getMatchupData(
	seasonType: string,
	week: number
): Promise<{ matchupData: MatchupData[] | null }> {
	const matchupDataKey = `${seasonType}:week:${week}:matchups`;
	const matchupDataRaw = await valkey?.get(matchupDataKey);
	if (!matchupDataRaw) {
		return { matchupData: null };
	}

	const matchupData = JSON.parse(matchupDataRaw)?.map((item: MatchupData) => item);
	return { matchupData };
}
