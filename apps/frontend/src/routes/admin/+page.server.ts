import { fail, type Actions } from '@sveltejs/kit';
import { beginWeek, endWeek, startActiveWeek, updateMatchups } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
// import { drizzle } from '$lib/clients/drizzle-client';
const drizzle = null;

export const actions: Actions = {
	beginWeek: async () => {
		const result = await beginWeek(valkey, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	beginPrevWeek: async () => {
		const result = await beginWeek(valkey, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	startActiveWeek: async () => {
		const result = await startActiveWeek(valkey, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	endWeek: async () => {
		const result = await endWeek(valkey, drizzle);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	updateMatchups: async () => {
		const result = await updateMatchups(valkey);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	}
};
