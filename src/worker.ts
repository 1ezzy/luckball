import svelteKitWorker from '../.svelte-kit/cloudflare/_worker';

export default {
	fetch: svelteKitWorker.fetch,
	async scheduled(ctr, env, ctx) {
		console.log('test');
	}
} satisfies ExportedHandler<Env>;
