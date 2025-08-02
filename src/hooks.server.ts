import createRequestHandler from '@sveltejs/adapter-cloudflare';
import type { ExecutionContext, ScheduledEvent } from '@cloudflare/workers-types';

const handler = createRequestHandler({
	config: 'wrangler.jsonc'
});

export default {
	async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
		await handleScheduledTasks(event, env, ctx);
	}
};

async function handleScheduledTasks(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
	// test cron job
	if (event.cron === '40 21 * * 5') {
		await testCron(env);
	}

	// create round (including status)
	if (event.cron === '0 0 * * 3') {
		// Every 6 hours
		await createNewRound(env);
	}

	// start round (update status)
	// if (event.cron === 'todo') {
	// 	await todo(env);
	// }

	// end round (update status)
	// if (event.cron === 'todo') {
	// 	await todo(env);
	// }
}

async function testCron(env: any) {
	console.log('This cron job fired!');
}

async function createNewRound(env: any) {
	console.log('Checking for new round start...');
}
