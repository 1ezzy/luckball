import PLimit from 'p-limit';

const limit = PLimit(5);

export class EspnApiClient {
	private fetch: typeof fetch;

	constructor(customFetch?: typeof fetch) {
		this.fetch = customFetch || fetch.bind(globalThis);
	}

	async getActiveWeek(): Promise<any> {
		const baseUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/season';
		const response = await this.fetch(`${baseUrl}`);
		const data = await response.json();

		let incrementWeek = false;
		const endDate = new Date(data.type.week.endDate);
		endDate.setHours(endDate.getHours() - 24);

		if (new Date() > endDate) {
			incrementWeek = true;
		}

		const currentWeekNumber = data.type.week.number + (incrementWeek ? 1 : 0);
		const currentWeekString = data.type.week.text.replace(
			data.type.week.number,
			incrementWeek ? currentWeekNumber : currentWeekNumber - 1
		);

		const currentWeek = currentWeekNumber;
		const currentWeekText = currentWeekString;
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

	async getMatchupScores(matchupId: number, teamIndex: number): Promise<number[]> {
		const baseUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events';
		const response = await this.fetch(
			`${baseUrl}/${matchupId}/competitions/${matchupId}/competitors`
		);

		const competitors = await response.json();
		const scores = await Promise.all(
			competitors.items.map(async (competitor: any) => {
				const scoreUrl = competitor.score.$ref.replace('http://', 'https://');
				const scoreRes = await fetch(scoreUrl);
				const scoreData = await scoreRes.json();
				return scoreData.value;
			})
		);

		return scores;
	}
}

export const createEspnApiClient = (customFetch?: typeof fetch) => {
	return new EspnApiClient(customFetch);
};
