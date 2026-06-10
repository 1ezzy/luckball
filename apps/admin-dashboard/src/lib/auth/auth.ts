import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { drizzle } from '$lib/clients/drizzle-client';
import { getRequestEvent } from '$app/server';
import { schema } from '@luckball/drizzle-client';
import { BETTER_AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	advanced: {
		cookiePrefix: 'admin'
	},
	plugins: [sveltekitCookies(getRequestEvent)],
	database: drizzleAdapter(drizzle, {
		provider: 'pg',
		schema: schema
	}),
	emailAndPassword: {
		enabled: false
	},
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID as string,
			clientSecret: GITHUB_CLIENT_SECRET as string
		}
	}
});
