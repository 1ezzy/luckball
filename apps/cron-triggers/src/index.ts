import type { ScheduledEvent, ExecutionContext } from '@cloudflare/workers-types';
import { beginWeek, endWeek, startActiveWeek } from '@luckball/game-logic';
import { createValkeyClient } from '@luckball/valkey-client';
import { createDrizzleClient } from '@luckball/drizzle-client';

export interface Env {
	LUCKBALL_DATA_VALKEY: string;
	VALKEY_USER: string;
	VALKEY_PASSWORD: string;
}

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		// switch (event.cron) {
		// 	case '*/5 * * * *': {
		// 		await handleBeginWeek(env);
		// 		break;
		// 	}
		// 	case '0 0 * * *': {
		// 		await handleStartActiveWeek(env);
		// 		break;
		// 	}
		// 	case '0 0 * * 1': {
		// 		await handleEndWeek(env);
		// 		break;
		// 	}
		// }
	}
};

const handleBeginWeek = async (env: Env) => {
	const valkey = createValkeyClient(env.LUCKBALL_DATA_VALKEY, env.VALKEY_USER, env.VALKEY_PASSWORD);
	const drizzle = createDrizzleClient(env);

	const result = await beginWeek(valkey, drizzle);

	if (!result.success) {
		return { success: false, error: result.message };
	}

	return { success: true };
};

const handleStartActiveWeek = async (env: Env) => {
	const valkey = createValkeyClient(env.LUCKBALL_DATA_VALKEY, env.VALKEY_USER, env.VALKEY_PASSWORD);
	const drizzle = createDrizzleClient(env);

	const result = await startActiveWeek(valkey, drizzle);

	if (!result.success) {
		return { success: false, error: result.message };
	}

	return { success: true };
};

const handleEndWeek = async (env: Env) => {
	const valkey = createValkeyClient(env.LUCKBALL_DATA_VALKEY, env.VALKEY_USER, env.VALKEY_PASSWORD);
	const drizzle = createDrizzleClient(env);

	const result = await endWeek(valkey, drizzle);

	if (!result.success) {
		return { success: false, error: result.message };
	}

	return { success: true };
};
