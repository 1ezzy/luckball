import { GlideClient } from '@valkey/valkey-glide';

export function createValkeyClient(url: string, username: string, password: string) {
	if (!url) {
		throw new Error('Valkey URL must be provided.');
	}

	return GlideClient.createClient({
		addresses: [{ host: url, port: 6379 }],
		credentials: { username: username, password: password }
	});
}
