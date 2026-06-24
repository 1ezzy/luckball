import type { IEspnClient } from './espn-client.interface';

export class MockEspnClient implements IEspnClient {
	async getActiveWeek() {
		return {
			currentWeek: 1,
			currentWeekText: 'Week 1',
			seasonType: 4
		};
	}

	async getWeekEvents(seasonType: number, weekNumber: number) {
		return {
			events: [
				{ id: 401547417, shortName: 'KC @ BUF', status: { type: { completed: true } } },
				{ id: 401547418, shortName: 'PHI @ DAL', status: { type: { completed: true } } },
				{ id: 401547419, shortName: 'SF @ LAR', status: { type: { completed: true } } },
				{ id: 401547420, shortName: 'GB @ CHI', status: { type: { completed: true } } },
				{ id: 401547421, shortName: 'MIA @ NE', status: { type: { completed: true } } },
				{ id: 401547422, shortName: 'NYJ @ NYG', status: { type: { completed: true } } },
				{ id: 401547423, shortName: 'PIT @ BAL', status: { type: { completed: true } } },
				{ id: 401547424, shortName: 'CLE @ CIN', status: { type: { completed: true } } },
				{ id: 401547425, shortName: 'DEN @ LV', status: { type: { completed: true } } },
				{ id: 401547426, shortName: 'SEA @ ARI', status: { type: { completed: true } } },
				{ id: 401547427, shortName: 'MIN @ DET', status: { type: { completed: true } } },
				{ id: 401547428, shortName: 'ATL @ NO', status: { type: { completed: true } } },
				{ id: 401547429, shortName: 'CAR @ TB', status: { type: { completed: false } } },
				{ id: 401547430, shortName: 'IND @ TEN', status: { type: { completed: false } } },
				{ id: 401547431, shortName: 'JAX @ HOU', status: { type: { completed: false } } },
				{ id: 401547432, shortName: 'WAS @ LAC', status: { type: { completed: false } } }
			],
			teams: [
				'KC',
				'BUF',
				'PHI',
				'DAL',
				'SF',
				'LAR',
				'GB',
				'CHI',
				'MIA',
				'NE',
				'NYJ',
				'NYG',
				'PIT',
				'BAL',
				'CLE',
				'CIN',
				'DEN',
				'LV',
				'SEA',
				'ARI',
				'MIN',
				'DET',
				'ATL',
				'NO',
				'CAR',
				'TB',
				'IND',
				'TEN',
				'JAX',
				'HOU',
				'WAS',
				'LAC'
			]
		};
	}

	async getMatchupScores(matchupId: number) {
		const fixtures: Record<number, number[]> = {
			401547417: [27, 21],
			401547418: [34, 28],
			401547419: [17, 24],
			401547420: [31, 14],
			401547421: [20, 13],
			401547422: [10, 17],
			401547423: [23, 20],
			401547424: [14, 28],
			401547425: [19, 22],
			401547426: [30, 16],
			401547427: [24, 31],
			401547428: [21, 17],
			401547429: [0, 0],
			401547430: [0, 0],
			401547431: [0, 0],
			401547432: [0, 0]
		};
		return fixtures[matchupId] ?? [0, 0];
	}
}

export const createMockEspnClient = () => {
	return new MockEspnClient();
};
