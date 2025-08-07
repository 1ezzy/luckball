import type { ScheduledEvent, ExecutionContext } from '@cloudflare/workers-types';
import { beginWeek, endWeek, startActiveWeek } from '@luckball/game-logic';
import { createRedisClient } from '@luckball/redis-client';
import { createDrizzleClient } from '@luckball/drizzle-client';

export interface Env {
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
}

export default {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		switch (event.cron) {
			case '*/5 * * * *': {
				await handleBeginWeek(env);
				break;
			}
			case '0 0 * * *': {
				await handleStartActiveWeek(env);
				break;
			}
			case '0 0 * * 1': {
				await handleEndWeek(env);
				break;
			}
		}
	}
};

const handleBeginWeek = async (env: Env) => {
	const redis = createRedisClient({
		url: env.UPSTASH_REDIS_REST_URL,
		token: env.UPSTASH_REDIS_REST_TOKEN
	});
	const drizzle = createDrizzleClient(env);

	const result = await beginWeek(redis, drizzle);

	if (!result.success) {
		return { success: false, error: result.message };
	}

	return { success: true };
};

const handleStartActiveWeek = async (env: Env) => {
	const redis = createRedisClient({
		url: env.UPSTASH_REDIS_REST_URL,
		token: env.UPSTASH_REDIS_REST_TOKEN
	});
	const drizzle = createDrizzleClient(env);

	const result = await startActiveWeek(redis, drizzle);

	if (!result.success) {
		return { success: false, error: result.message };
	}

	return { success: true };
};

const handleEndWeek = async (env: Env) => {
	const redis = createRedisClient({
		url: env.UPSTASH_REDIS_REST_URL,
		token: env.UPSTASH_REDIS_REST_TOKEN
	});
	const drizzle = createDrizzleClient(env);

	const result = await endWeek(redis, drizzle);

	if (!result.success) {
		return { success: false, error: result.message };
	}

	return { success: true };
};
