import { auth } from '$lib/auth/auth';
import { APIError } from 'better-auth/api';
import { fail, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals }: ServerLoadEvent) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session) {
		throw redirect(307, '/');
	}

	const isSignUpEnabled = locals.flags['enable-sign-up'];
	if (!isSignUpEnabled) {
		throw redirect(307, '/login');
	}
};

export const actions: Actions = {
	signUp: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email')?.toString();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		if (!email || !username || !password) {
			return fail(400, { username, error: 'Information is required' });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					name: username,
					username,
					password
				},
				headers: request.headers
			});
		} catch (error) {
			console.log(error);
			if (error instanceof APIError) {
				return fail(400, { username, error: error.message });
			}
			throw error;
		}

		throw redirect(303, '/login');
	}
};
