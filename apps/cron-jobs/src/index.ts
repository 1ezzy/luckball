import { beginWeek, endWeek, startActiveWeek, updateScores } from '@luckball/game-logic';
import { createValkeyClient } from '@luckball/valkey-client';
import { createDrizzleClient } from '@luckball/drizzle-client';

export class CronJobRunner {
	valkey: ReturnType<typeof createValkeyClient>;
	drizzle: ReturnType<typeof createDrizzleClient>;

	constructor(env: any) {
		this.valkey = createValkeyClient(env.VALKEY_URL);
		this.drizzle = createDrizzleClient(env);
	}

	async handleBeginWeek() {
		const result = await beginWeek(this.valkey);
		console.log('♣ Beginning Week..');
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async handleStartActiveWeek() {
		const result = await startActiveWeek(this.valkey);
		console.log('♣ Starting Active Week...');
		return result.success ? { success: true } : { success: false, error: result.message };
	}

	async handleEndWeek() {
		const result = await endWeek(this.valkey, this.drizzle);
		console.log('♣ Ending Week...');
		return result?.success ? { success: true } : { success: false };
	}

	async updateScores() {
		const result = await updateScores(this.valkey);
		console.log('♣ Updating Scores...');
		return result.success ? { success: true } : { success: false, error: result.message };
	}
}
