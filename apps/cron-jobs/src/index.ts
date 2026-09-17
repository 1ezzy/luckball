import {
	beginWeek,
	checkAndStartActiveWeek,
	endWeek,
	startActiveWeek,
	updateScores
} from '@luckball/game-logic';
import { createValkeyClient } from '@luckball/valkey-client';
import { createDrizzleClient } from '@luckball/drizzle-client';

export class CronJobRunner {
	valkey: ReturnType<typeof createValkeyClient>;
	drizzle: ReturnType<typeof createDrizzleClient>;

	constructor(env: any) {
		this.valkey = createValkeyClient(env.VALKEY_URL);
		this.drizzle = createDrizzleClient(env.POSTGRES_URL);
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

	async handleCheckStartActiveWeek() {
		const result = await checkAndStartActiveWeek(this.valkey);
		console.log(result.started ? '♣ Kickoff imminent - starting active week...' : '♣ Not time yet, skipping.');
		return result.success ? { success: true, started: result.started } : { success: false, error: result.message };
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
