import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

export const createClient = () => {
	const client = postgres(process.env.POSTGRES_LOCAL!);
	return drizzle(client);
};
