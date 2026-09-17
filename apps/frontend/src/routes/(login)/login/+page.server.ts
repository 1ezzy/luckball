import { auth } from '$lib/auth/auth';
import { APIError } from 'better-auth/api';
import { fail, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }: ServerLoadEvent) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session) {
		throw redirect(307, '/');
	}
};

export const actions: Actions = {
	login: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const rememberMe = !!data.get('rememberMe');
		if (!username || !password) {
			return fail(400, { username, error: 'Information is required' });
		}

		try {
			await auth.api.signInUsername({
				body: {
					username,
					password,
					rememberMe
				},
				headers: request.headers
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { username, error: error.message });
			}
			throw error;
		}

		throw redirect(303, '/');
	}
};
