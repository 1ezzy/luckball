export class EspnApiClient {
    async getActiveWeek(): Promise<any> {
        const baseUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';
        const response = await fetch(`${baseUrl}/scoreboard`);
        const data = await response.json();
        
        return {
            currentWeek: data.week.number,
            seasonType: data.season.type === 2 ? 'regular' : 'preseason'
        };
    }

    async getWeekEvents(seasonType: string, weekNumber: number): Promise<any> {
        const baseUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
        const seasonTypeId = seasonType === 'regular' ? 2 : 1;
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();
        
        return {
            events: data.events || []
        };
    }
}

export const espnApi = new EspnApiClient();