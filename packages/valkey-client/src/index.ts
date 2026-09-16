import Valkey from 'iovalkey';

export type ValkeyClient = ReturnType<typeof createValkeyClient>;

export function createValkeyClient(url: string) {
	if (process.env.NODE_ENV === 'build' || process.env.SKIP_VALKEY === 'true') {
		return null;
	}

	if (!url) {
		throw new Error('Valkey URL must be provided.');
	}

	const client = new Valkey(url);
	client.on('error', (err) => {
		console.error('Valkey connection error:', err);
	});

	return client;
}
