import { Redis } from '@upstash/redis/cloudflare';

interface RedisCredentials {
    url: string;
    token: string;
}

export function createRedisClient(credentials: RedisCredentials) {
    if (!credentials.url || !credentials.token) {
        throw new Error('Redis URL and Token must be provided.');
    }
    return new Redis({
        url: credentials.url,
        token: credentials.token
    });
}