export default {
	async scheduled(event, env, ctx) {
		await handleScheduledTasks(event, env, ctx);
	}
};

async function handleScheduledTasks(event, env, ctx) {
	// test cron job
	if (event.cron === '10 23 * * 6') {
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
