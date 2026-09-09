export interface Team {
	name: string;
	players: string[];
	nflTeams: string[];
	totalScore: number;
	won?: boolean;
}

export enum WeekStatus {
	Pending = 'pending',
	InProgress = 'in_progress',
	Ended = 'ended'
}

export interface MatchupScore {
	[teamName: string]: number;
}

export interface Matchup {
	event: string;
	id: number;
	date: string;
	teams: string[];
	matchupScores?: MatchupScore[];
}

export interface WeekData {
	teams: Team[];
	status: WeekStatus;
	winningTeamName?: string;
	winningTeamScore?: number;
	bestNflTeamName?: string;
	bestNflTeamScore?: number;
	lastWinningTeam?: string;
}

export interface Boost {
	multiplier: number;
	team: string;
}

export interface User {
	displayName: string;
	joinedAt: string;
	teamAssignment: string | null;
	boosts: Boost[] | null;
}

export type AllUsersData = Record<string, string>;
