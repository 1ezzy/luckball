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
		const result = await updateScores(this.valkey);
		return result.success ? { success: true } : { success: false, error: result.message };
	}
}

const runner = new CronJobRunner(process.env);

// cron jobs for game state
cron.schedule('0 2 * * 3', () => runner.handleBeginWeek()); // Every Wednesday 2:00
cron.schedule('0 17 * * 4', () => runner.handleStartActiveWeek()); // Thursday 17:00
cron.schedule('0 2 * * 2', () => runner.handleEndWeek()); // Tuesday 2:00

// cron jobs to update schedules
cron.schedule('*/20 19-23 * * 4', () => runner.updateScores()); // Thursday 19:00–23:59
cron.schedule('*/20 * * * 0', () => runner.updateScores()); // Sunday 00:00–23:59
cron.schedule('*/20 19-23 * * 1', () => runner.updateScores()); // Monday 19:00-23:59
