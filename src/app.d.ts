// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Env {}
		export default {
			async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {}
		};
	}
}

export {};
