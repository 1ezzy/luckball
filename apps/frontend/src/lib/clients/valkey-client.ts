import { createValkeyClient } from '@luckball/valkey-client';
import { VALKEY_URL } from '$env/static/private';

export const valkey = createValkeyClient(VALKEY_URL);
