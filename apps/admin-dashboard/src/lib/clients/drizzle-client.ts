import { POSTGRES_URL } from '$env/static/private';
import { createDrizzleClient } from '@luckball/drizzle-client';

export const drizzle = createDrizzleClient(POSTGRES_URL);
