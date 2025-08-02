import type { ScheduledEvent, ExecutionContext } from '@cloudflare/workers-types';

export default {
	async scheduled(event: ScheduledEvent, env, ctx: ExecutionContext) {
		console.log('scheduled fired!');
		ctx.waitUntil(handleScheduledTasks(event, env, ctx));
	}
};

const handleScheduledTasks = async (event: ScheduledEvent, env, ctx: ExecutionContext) => {
	// Your existing cron logic from index.ts
	if (event.cron === '*/1 * * * *') {
		await testCron(env);
	}

	// if (event.cron === '0 0 * * 3') {
	// 	await createNewRound(env);
	// }
};

const testCron = async (env: any) => {
	console.log('This cron job fired!');
};

// const createNewRound = async (env: any) => {
// 	console.log('Checking for new round start...');
// };
