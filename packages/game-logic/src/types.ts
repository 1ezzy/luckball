export interface Team {
	name: string;
	players: string[];
	nflTeams: string[];
	totalScore: number;
	wins: number;
}

export enum WeekStatus {
	Pending = 'pending',
	InProgress = 'in_progress',
	Ended = 'ended'
}

export interface MatchupScore {
	[teamName: string]: number;
}

export interface MatchupData {
	event: string;
	id: number;
	date: Date;
	teams: string[];
	matchupScores: MatchupScore[];
}

export interface WeekData {
	team1: Team;
	team2: Team;
	status: WeekStatus;
	score?: string[];
	winningTeamName?: string;
	winningTeamScore?: string;
	bestNflTeamName?: string;
	bestNflTeamScore?: string;
	lastWinningTeam?: string;
}

export interface BoostSelection {}

export interface User {
	displayName: string;
	joinedAt: string;
	teamAssignment: string | null;
	boostsSelected: BoostSelection[] | null;
}

export type AllUsersData = Record<string, string>;
