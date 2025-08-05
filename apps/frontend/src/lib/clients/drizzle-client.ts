import { createDrizzleClient } from '@luckball/drizzle-client';

export const drizzle = (platform: App.Platform) => {
	return createDrizzleClient(platform.env);
};
