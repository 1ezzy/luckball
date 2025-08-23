import { auth } from '$lib/auth/auth';
import { type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }: ServerLoadEvent) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	return { session };
};
