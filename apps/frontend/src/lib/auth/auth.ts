import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { drizzle } from '$lib/clients/drizzle-client';
import { getRequestEvent } from '$app/server';
import * as schema from '$lib/db/schema';
import {
	BETTER_AUTH_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	plugins: [sveltekitCookies(getRequestEvent)],
	database: drizzleAdapter(drizzle, {
		provider: 'pg',
		schema: schema
	}),
	emailAndPassword: {
		enabled: false
	},
	socialProviders: {
		discord: {
			clientId: DISCORD_CLIENT_ID as string,
			clientSecret: DISCORD_CLIENT_SECRET as string
		},
		google: {
			clientId: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string
		}
	}
});
