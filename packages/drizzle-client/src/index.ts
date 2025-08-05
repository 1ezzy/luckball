import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const createDrizzleClient = (env: any) => {
	// is this correct
	const client = postgres(env.HYPERDRIVE.connectionString);
	return drizzle(client);
};
