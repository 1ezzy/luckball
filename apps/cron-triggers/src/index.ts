import type {ScheduledEvent, ExecutionContext} from '@cloudflare/workers-types';
import { createRedisClient } from '@luckball/redis-client';

export interface Env {
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
}

export default {
    async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
        console.log(`Cron job triggered: ${event.cron}`);

        try {
            const redis = createRedisClient({
                url: env.UPSTASH_REDIS_REST_URL,
                token: env.UPSTASH_REDIS_REST_TOKEN
            });

            await redis.set('cron-last-run', new Date().toISOString());
            console.log('Successfully wrote to Redis from scheduled function.');
        } catch (e) {
            console.error('Error in scheduled function:', e);
        }
    }
};