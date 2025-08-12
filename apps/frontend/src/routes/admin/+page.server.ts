import { fail, type Actions } from '@sveltejs/kit';
import { beginWeek, endWeek, startActiveWeek } from '@luckball/game-logic';
import { redis } from '$lib/clients/redis-client';
import { drizzle } from '$lib/clients/drizzle-client';

export const actions: Actions = {
	beginWeek: async () => {
		const result = await beginWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	beginPrevWeek: async () => {
		const result = await beginWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	startActiveWeek: async () => {
		const result = await startActiveWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	endWeek: async () => {
		const result = await endWeek(redis, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	}
};
