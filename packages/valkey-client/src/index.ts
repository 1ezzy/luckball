import Valkey from 'iovalkey';

export function createValkeyClient(url: string) {
	if (process.env.NODE_ENV === 'build' || process.env.SKIP_VALKEY === 'true') {
		return null;
	}

	if (!url) {
		throw new Error('Valkey URL must be provided.');
	}

	return new Valkey({
		port: 6379,
		host: url,
		db: 0
	});
}
