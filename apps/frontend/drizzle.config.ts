import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE!,
		database: 'luckball'
	}
});
