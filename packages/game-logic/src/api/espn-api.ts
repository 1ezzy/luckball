export class EspnApiClient {
	async getActiveWeek(): Promise<any> {
		const baseUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
		const response = await fetch(`${baseUrl}`);
		const data = await response.json();

		return {
			currentWeek: data.week.number,
			seasonType: data.season
		};
	}

	async getWeekEvents(seasonType: string, weekNumber: number): Promise<any> {
		// const baseUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';
		// const response = await fetch(
		// 	`${baseUrl}/seasons/2025/types/${seasonType}/weeks/${weekNumber}/events`
		// );
		// const data = await response.json();
		// const eventsResponse = data.items.map((event: { $ref: string }) => fetch(event.$ref));
		// const eventData = await Promise.all(eventsResponse);
		// const eventJsonPromises = eventData.map((res: any) => res.json());
		// const events = await Promise.all(eventJsonPromises);
		// const teams = events.flatMap((event) => {
		// 	const nameParts = event.shortName.split(' ');
		// 	return [nameParts[0], nameParts[2]];
		// });
		// return {
		// 	events: events || [],
		// 	teams: teams
		// };
	}
}

export const espnApi = new EspnApiClient();
