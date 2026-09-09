import { auth } from '$lib/auth/auth';
import { fail, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { beginWeek, endWeek, startActiveWeek, updateScores } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
import { drizzle } from '$lib/clients/drizzle-client';

export const load: PageServerLoad = async ({ request }: ServerLoadEvent) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw redirect(307, '/login');
	}
};

export const actions: Actions = {
	beginWeek: async () => {
		const result = await beginWeek(valkey);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	startActiveWeek: async () => {
		const result = await startActiveWeek(valkey);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	},
	endWeek: async () => {
		const result = await endWeek(valkey, drizzle);

		if (!result?.success) {
			return fail(400, { error: result?.message });
		}

		return { success: true };
	},
	updateScores: async () => {
		const result = await updateScores(valkey);

		if (!result.success) {
			return fail(400, { error: result.message });
		}

		return { success: true };
	}
};
