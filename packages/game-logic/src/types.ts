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

export interface Matchup {
	event: string;
	id: number;
	date: string;
	teams: string[];
	matchupScores: MatchupScore[];
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

export interface BoostSelection {
	multiplier1Team: string;
	multiplier2Team: string;
	multiplier3Team: string;
	scoreStealTeam: string;
	bestTeamSelection: string;
	worstTeamSelection: string;
}

export interface User {
	displayName: string;
	joinedAt: string;
	teamAssignment: string | null;
	boosts: BoostSelection[] | null;
}

export type AllUsersData = Record<string, string>;
