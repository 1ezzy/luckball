import PLimit from 'p-limit';
import type { GlideClient } from '@valkey/valkey-glide';

const limit = PLimit(5);

export class EspnApiClient {
	private fetch: typeof fetch;
	private valkey: GlideClient;

	constructor(valkey: any, customFetch?: typeof fetch) {
		this.fetch = customFetch || fetch.bind(globalThis);
		this.valkey = valkey;
	}

	async getActiveWeek(): Promise<any> {
		const baseUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/season';
		const response = await this.fetch(`${baseUrl}`);
		const data = await response.json();

		const currentWeek = data.type.week.number;
		const currentWeekText = data.type.week.text;
		const seasonType = data.type.type;

		return {
			currentWeek,
			currentWeekText,
			seasonType
		};
	}

	async getWeekEvents(seasonType: string, weekNumber: number): Promise<any> {
		const baseUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';
		const response = await this.fetch(
			`${baseUrl}/seasons/2025/types/${seasonType}/weeks/${weekNumber}/events`
		);
		const data = await response.json();

		const events = await Promise.all(
			data.items.map((event: { $ref: string }) =>
				limit(async () => {
					const secureUrl = event.$ref.replace('http://', 'https://');
					const res = await this.fetch(secureUrl);
					if (!res.ok) {
						console.error(`Failed to fetch ${secureUrl}: ${res.statusText}`);
						return null;
					}
					return res.json();
				})
			)
		);

		const validEvents = events.filter((event) => event !== null);
		const teams = validEvents.flatMap((event) => {
			const nameParts = event.shortName.split(' ');
			return [nameParts[0], nameParts[2]];
		});

		return {
			events: events || [],
			teams: teams
		};
	}
}

export const createEspnApiClient = (valkey: any, customFetch?: typeof fetch) => {
	return new EspnApiClient(valkey, customFetch);
};
