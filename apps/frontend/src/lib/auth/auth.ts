import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from '$lib/clients/drizzle-client';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import * as schema from '$lib/db/schema';

export const auth = betterAuth({
	plugins: [sveltekitCookies(getRequestEvent)],
	database: drizzleAdapter(drizzle, {
		provider: 'pg',
		schema: schema
	}),
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		discord: {
			clientId: DISCORD_CLIENT_ID as string,
			clientSecret: DISCORD_CLIENT_SECRET as string
		}
	}
});
