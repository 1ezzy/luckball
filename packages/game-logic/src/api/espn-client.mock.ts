import type { IEspnClient } from './espn-client.interface';

export class MockEspnClient implements IEspnClient {
	async getActiveWeek() {
		return {
			currentWeek: 4,
			currentWeekText: 'Week 4',
			seasonType: 2
		};
	}

	async getWeekEvents(seasonType: string, weekNumber: number) {
		return {
			events: [
				{ id: 401547417, shortName: 'KC @ BUF', status: { type: { completed: true } } },
				{ id: 401547418, shortName: 'PHI @ DAL', status: { type: { completed: false } } }
			],
			teams: ['KC', 'BUF', 'PHI', 'DAL']
		};
	}

	async getMatchupScores(matchupId: number) {
		const fixtures: Record<number, number[]> = {
			401547417: [27, 21],
			401547418: [14, 14]
		};
		return fixtures[matchupId] ?? [0, 0];
	}
}

export const createMockEspnClient = () => {
	return new MockEspnClient();
};
