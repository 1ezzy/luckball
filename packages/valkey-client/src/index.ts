import Valkey from 'iovalkey';

export function createValkeyClient(url: string, username: string, password: string) {
	if (!url) {
		throw new Error('Valkey URL must be provided.');
	}

	return new Valkey({
		port: 6379,
		host: url,
		username: username,
		password: password,
		db: 0
	});
}
