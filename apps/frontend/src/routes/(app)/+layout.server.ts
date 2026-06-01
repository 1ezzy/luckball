import { auth } from '$lib/auth/auth';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session) throw redirect(307, '/login');

	const userId = session?.user.id;
	if (!userId) throw error(400, 'User ID is required');

	return { userId };
};
