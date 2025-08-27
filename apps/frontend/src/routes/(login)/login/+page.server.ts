import { auth } from '$lib/auth/auth';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }: ServerLoadEvent) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session) {
		throw redirect(307, '/');
	}
};
