export interface EspnEvent {
	id: number;
	shortName: string;
	date: string;
	status: { type: { completed: boolean } };
}

export interface IEspnClient {
	getActiveWeek(): Promise<{ currentWeek: number; currentWeekText: string; seasonType: number }>;
	getWeekEvents(
		seasonType: number,
		weekNumber: number
	): Promise<{ events: EspnEvent[]; teams: string[] }>;
	getMatchupScores(matchupId: number): Promise<number[]>;
}
