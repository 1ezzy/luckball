import { valkey } from '$lib/clients/valkey-client';
import type { AllUsersData, User, WeekData } from '$lib/types/valkey-types';
import { Batch } from '@valkey/valkey-glide';

export async function getWeekAndUserData(
	seasonType: string,
	week: number
): Promise<{ weekData: WeekData | null; allUserData: AllUsersData | null }> {
	const weekDataKey = `${seasonType}:week:${week}:data`;
	const allUsersDataKey = `${seasonType}:week:${week}:users`;

	const transaction = new Batch(false).get(weekDataKey).hgetall(allUsersDataKey);

	const results = await valkey.exec(transaction, true);
	if (!results) {
		return { weekData: null, allUserData: null };
	}

	const weekDataString = results[0] as string;
	const weekData = weekDataString ? (JSON.parse(weekDataString) as WeekData) : null;

	const allUserData = results[1] as AllUsersData | null;

	return { weekData, allUserData };
}

export async function getWeekData(
	seasonType: string,
	week: number
): Promise<{ weekData: WeekData }> {
	const weekDataKey = `${seasonType}:week:${week}:data`;
	const weekDataString = await valkey.get(weekDataKey);
	const weekData = weekDataString ? JSON.parse(weekDataString as string) : null;

	return { weekData };
}

export async function getAllUsersData(
	seasonType: string,
	week: number
): Promise<{ allUsersData: AllUsersData | null }> {
	const userDataKey = `${seasonType}:week:${week}:users`;
	const usersDataHash = await valkey.hgetall(userDataKey);

	if (!usersDataHash) {
		return { allUsersData: null };
	}

	const allUsersData = Object.fromEntries(
		Object.entries(usersDataHash).map(([key, value]) => [key, JSON.parse(value.value as string)])
	) as AllUsersData;

	return { allUsersData };
}

export async function getUserDataById(
	seasonType: string,
	week: number,
	userId: string
): Promise<{ userData: User }> {
	const userDataKey = `${seasonType}:week:${week}:users`;
	const userDataString = await valkey.hget(userDataKey, userId);
	const userData = userDataString ? JSON.parse(userDataString as string) : null;
	return { userData };
}
