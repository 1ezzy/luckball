import Valkey from 'iovalkey';

export function createValkeyClient(url: string) {
	if (!url) {
		throw new Error('Valkey URL must be provided.');
	}

	return new Valkey({
		port: 6379,
		host: url,
		db: 0
	});
}
