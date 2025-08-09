import { redis } from '$lib/clients/redis-client';
import type { AllUsersData, WeekData, User } from '$lib/types/redis-types';

export async function getWeekAndUserData(
	seasonType: string,
	week: number
): Promise<{ weekData: WeekData | null; allUserData: AllUsersData | null }> {
	const weekDataKey = `${seasonType}:week:${week}:data`;
	const allUsersDataKey = `${seasonType}:week:${week}:users`;

	const pipeline = redis.pipeline();
	pipeline.get<WeekData>(weekDataKey);
	pipeline.hgetall<AllUsersData>(allUsersDataKey);

	const results = await pipeline.exec();

	const weekData = results[0] as WeekData | null;
	const allUserData = results[1] as AllUsersData | null;

	return { weekData, allUserData };
}

export async function getWeekData(
	seasonType: string,
	week: number
): Promise<{ weekData: WeekData | null }> {
	const weekDataKey = `${seasonType}:week:${week}:data`;
	const weekData = await redis.get<WeekData>(weekDataKey);
	return { weekData };
}

export async function getAllUsersData(
	seasonType: string,
	week: number
): Promise<{ allUsersData: AllUsersData | null }> {
	const userDataKey = `${seasonType}:week:${week}:users`;
	const allUsersData = await redis.hgetall<AllUsersData>(userDataKey);
	return { allUsersData };
}

export async function getUserDataById(
	seasonType: string,
	week: number,
	userId: string
): Promise<{ userData: User | null }> {
	const userDataKey = `${seasonType}:week:${week}:users`;
	const userData = await redis.hget<User>(userDataKey, userId);
	return { userData };
}
