import { building } from '$app/environment';
import { auth } from '$lib/auth/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { GrowthBook } from '@growthbook/growthbook';
import { GROWTHBOOK_API_HOST, GROWTHBOOK_CLIENT_KEY } from '$env/static/private';
import { FEATURE_FLAGS, type FeatureFlags } from './flags';

console.log('[debug] hooks.server.ts module evaluated, GROWTHBOOK_API_HOST =', GROWTHBOOK_API_HOST);

export async function handle({ event, resolve }) {
	console.log('[debug] handle() start', event.url.pathname);

	// fetch current session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	console.log('[debug] getSession done');

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
	console.log('[debug] calling gb.init()');
	await gb.init();
	console.log('[debug] gb.init() done');

	event.locals.flags = Object.fromEntries(
		FEATURE_FLAGS.map((key) => [key, gb.isOn(key)])
	) as FeatureFlags;

	gb.destroy();

	console.log('[debug] calling svelteKitHandler');
	return svelteKitHandler({ event, resolve, auth, building });
}
