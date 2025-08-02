export default {
	async scheduled(event, env, ctx) {
		console.log('scheduled fired!');
		await handleScheduledTasks(event, env, ctx);
	}
};

const handleScheduledTasks = async (event, env, ctx) => {
	// test cron job
	if (event.cron === '*/1 * * * *') {
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
};

const testCron = async (env: any) => {
	console.log('This cron job fired!');
};

const createNewRound = async (env: any) => {
	console.log('Checking for new round start...');
};
