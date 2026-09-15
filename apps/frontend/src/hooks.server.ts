import { building } from '$app/environment';
import { auth } from '$lib/auth/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { GrowthBook } from '@growthbook/growthbook';
import { GROWTHBOOK_API_HOST, GROWTHBOOK_CLIENT_KEY } from '$env/static/private';
import { FEATURE_FLAGS, type FeatureFlags } from './flags';

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

	// instantiate growthbook feature management
	const gb = new GrowthBook({
		apiHost: GROWTHBOOK_API_HOST,
		clientKey: GROWTHBOOK_CLIENT_KEY,
		attributes: { id: event.locals.user?.id ?? 'anonymous' }
	});
	await gb.init();

	event.locals.flags = Object.fromEntries(
		FEATURE_FLAGS.map((key) => [key, gb.isOn(key)])
	) as FeatureFlags;

	gb.destroy();

	return svelteKitHandler({ event, resolve, auth, building });
}
