import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { username } from 'better-auth/plugins';
import { drizzle } from '$lib/clients/drizzle-client';
import { getRequestEvent } from '$app/server';
import { schema } from '@luckball/drizzle-client';
import {
	BETTER_AUTH_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';
import { page } from '$app/state';

const signUpEnabled = page.data.flags['enable-sign-up'];

export const auth = betterAuth({
	baseURL: PUBLIC_BETTER_AUTH_URL,
	secret: BETTER_AUTH_SECRET,
	plugins: [username(), sveltekitCookies(getRequestEvent)],
	database: drizzleAdapter(drizzle, {
		provider: 'pg',
		schema: schema
	}),
	emailAndPassword: {
		enabled: true,
		disableSignUp: signUpEnabled
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
