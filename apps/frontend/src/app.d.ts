import type { Session, User } from 'better-auth/*';
import type { FeatureFlags } from './flags';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session?: Session;
			user?: User;
			flags: FeatureFlags;
		}
	}
}

export {};
