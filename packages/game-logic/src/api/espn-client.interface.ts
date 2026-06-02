export interface IEspnClient {
	getActiveWeek(): Promise<{ currentWeek: number; currentWeekText: string; seasonType: number }>;
	getWeekEvents(
		seasonType: string,
		weekNumber: number
	): Promise<{ events: any[]; teams: string[] }>;
	getMatchupScores(matchupId: number): Promise<number[]>;
}
