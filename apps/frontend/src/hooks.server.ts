import { building } from '$app/environment';
import { auth } from '$lib/auth/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export async function handle({ event, resolve }) {
	// fetch current session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// provide session and user to runtime server
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
}
