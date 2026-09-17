import type { EspnEvent, IEspnClient } from './espn-client.interface';
import weekEvents from './mock-data/week-events.json';
import matchupScores from './mock-data/matchup-scores.json';

export class MockEspnClient implements IEspnClient {
	async getActiveWeek() {
		return {
			currentWeek: 1,
			currentWeekText: 'Week 1',
			seasonType: 4
		};
	}

	async getWeekEvents(
		_seasonType: number,
		_weekNumber: number
	): Promise<{ events: EspnEvent[]; teams: string[] }> {
		return weekEvents;
	}

	async getMatchupScores(matchupId: number) {
		const fixtures: Record<number, number[]> = matchupScores;
		return fixtures[matchupId] ?? [0, 0];
	}
}

export const createMockEspnClient = () => {
	return new MockEspnClient();
};
