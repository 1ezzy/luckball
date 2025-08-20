import { beginWeek, endWeek, startActiveWeek } from '@luckball/game-logic';
import { createValkeyClient } from '@luckball/valkey-client';
import { createDrizzleClient } from '@luckball/drizzle-client';
import cron from 'node-cron';

interface Env {
	LUCKBALL_DATA_VALKEY?: string;
}

export class CronJobRunner {
	valkey: ReturnType<typeof createValkeyClient>;
	drizzle: ReturnType<typeof createDrizzleClient>;

	constructor(env: any) {
		this.valkey = createValkeyClient(env.LUCKBALL_DATA_VALKEY);
		// this.drizzle = createDrizzleClient(env);
		this.drizzle = undefined;
	}

	async handleBeginWeek() {
		const result = await beginWeek(this.valkey, this.drizzle);
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async handleStartActiveWeek() {
		const result = await startActiveWeek(this.valkey, this.drizzle);
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async handleEndWeek() {
		const result = await endWeek(this.valkey, this.drizzle);
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async updateScores() {
		console.log('UPDATING SCORES!');
	}
}

const runner = new CronJobRunner(process.env as Env);

cron.schedule('0 2 * * 3', () => runner.handleBeginWeek()); // Every Monday
cron.schedule('0 17 * * 4', () => runner.handleStartActiveWeek()); // Monday noon
cron.schedule('0 2 * * 2', () => runner.handleEndWeek()); // Tuesday Morning

cron.schedule('*/1 * * * *', () => runner.updateScores()); // update scores regularly
