import 'dotenv/config';
import { createDrizzleClient } from '@luckball/drizzle-client';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const db = createDrizzleClient(process.env.POSTGRES_URL!);

await migrate(db, { migrationsFolder: './drizzle' });
await db.$client.end();

console.log('Drizzle migrations applied.');
