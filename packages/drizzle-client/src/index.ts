import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const createDrizzleClient = (url: string) => {
	const client = postgres(url);
	return drizzle(client, { schema });
};

export { schema };
