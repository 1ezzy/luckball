import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const createClient = (env: App.Platform['env']) => {
	const client = postgres(env.HYPERDRIVE.connectionString);
	return drizzle(client);
};
