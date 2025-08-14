import { createValkeyClient } from '@luckball/valkey-client';
import { LUCKBALL_DATA_VALKEY, VALKEY_USER, VALKEY_PASSWORD } from '$env/static/private';

export const valkey = await createValkeyClient(LUCKBALL_DATA_VALKEY, VALKEY_USER, VALKEY_PASSWORD);
