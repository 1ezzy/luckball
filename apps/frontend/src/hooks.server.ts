// src/hooks.server.ts
import type { ScheduledEvent, ExecutionContext } from '@cloudflare/workers-types';
import { redis } from '$lib/clients/redis-client';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};

export const scheduled = async (
	event: ScheduledEvent,
	env: any,
	ctx: ExecutionContext
): Promise<void> => {
	console.log(
		`--- HOOKS.SERVER.TS SCHEDULED FUNCTION WAS TRIGGERED AT ${new Date().toISOString()} ---`
	);

	try {
		await redis.set('cron-last-run', new Date().toISOString());
		console.log('Successfully wrote to Redis from scheduled function.');
	} catch (e) {
		console.error('Error writing to Redis from scheduled function:', e);
	}
};
