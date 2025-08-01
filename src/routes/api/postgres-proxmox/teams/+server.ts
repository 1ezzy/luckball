import { json } from '@sveltejs/kit';
import { createClient } from '$lib/clients/drizzle-client';
import { teams } from '$lib/db/schema';

export const GET = async ({ platform }) => {
	try {
		const db = createClient(platform!.env);
		const query = await db.select().from(teams);
		return json(query);
	} catch (err) {
		console.error('Error fetching teams:', err);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
