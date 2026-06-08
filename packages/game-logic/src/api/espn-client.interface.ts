export interface IEspnClient {
	getActiveWeek(): Promise<{ currentWeek: number; currentWeekText: string; seasonType: number }>;
	getWeekEvents(
		seasonType: number,
		weekNumber: number
	): Promise<{ events: any[]; teams: string[] }>;
	getMatchupScores(matchupId: number): Promise<number[]>;
}
