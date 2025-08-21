import { beginWeek, endWeek, startActiveWeek, updateScores } from '@luckball/game-logic';
import { createValkeyClient } from '@luckball/valkey-client';
import { createDrizzleClient } from '@luckball/drizzle-client';
import cron from 'node-cron';

export class CronJobRunner {
	valkey: ReturnType<typeof createValkeyClient>;
	drizzle: ReturnType<typeof createDrizzleClient>;

	constructor(env: any) {
		this.valkey = createValkeyClient(env.VALKEY_URL);
		// this.drizzle = createDrizzleClient(env);
		this.drizzle = undefined;
	}

	async handleBeginWeek() {
		const result = await beginWeek(this.valkey, this.drizzle);
		console.log('♣ Beginning Week..');
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async handleStartActiveWeek() {
		const result = await startActiveWeek(this.valkey, this.drizzle);
		console.log('♣ Starting Active Week...');
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async handleEndWeek() {
		const result = await endWeek(this.valkey, this.drizzle);
		console.log('♣ Ending Week...');
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async updateScores() {
		const result = await updateScores(this.valkey);
		console.log('♣ Updating Scores...');
		return result.success ? { success: true } : { success: false, error: result.message };
	}
}

const runner = new CronJobRunner(process.env);

// cron jobs for game state
cron.schedule('0 6 * * 3', () => runner.handleBeginWeek()); // Wednesday 06:00 UTC
cron.schedule('0 21 * * 4', () => runner.handleStartActiveWeek()); // Thursday 21:00 UTC
cron.schedule('0 6 * * 2', () => runner.handleEndWeek()); // Tuesday 06:00 UTC

// cron jobs to update schedules
cron.schedule('*/10 23-3 * * 4', () => runner.updateScores()); // Thursday 23:00–03:59 UTC
cron.schedule('*/10 12-3 * * 6', () => runner.updateScores()); // Saturday 12:00–03:59 UTC
cron.schedule('*/10 12-3 * * 0', () => runner.updateScores()); // Sunday 12:00–03:59 UTC
cron.schedule('*/10 23-3 * * 1', () => runner.updateScores()); // Monday 23:00–03:59 UTC
