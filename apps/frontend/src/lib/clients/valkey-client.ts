import { createValkeyClient } from '@luckball/valkey-client';
import { VALKEY_URL } from '$env/static/private';

export const valkey = await createValkeyClient(VALKEY_URL);
