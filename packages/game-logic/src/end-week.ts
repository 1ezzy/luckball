import { schema } from '@luckball/drizzle-client';
import { createEspnClient } from './api/espn-client';
import { eq, sql } from 'drizzle-orm';

export const endWeek = async (valkey: any, drizzle: any) => {
	const espnApi = createEspnClient();
	const { currentWeek, seasonType } = await espnApi.getActiveWeek();

	const usersKey = `${seasonType}:week:${currentWeek}:users`;
	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const matchupsKey = `${seasonType}:week:${currentWeek}:matchups`;

	const currentWeekData = await valkey.get(weekDataKey);
	if (JSON.parse(currentWeekData).status !== 'in_progress') {
		return {
			success: false,
			message: 'Week not started - current week data status not "in_progress"'
		};
	}

	// get a list of all the users
	const users = await valkey.hgetall(usersKey);
	if (!users || Object.keys(users).length === 0) {
		return { success: false, message: 'No users to start the week.' };
	}

	const weekData = JSON.parse(currentWeekData);
	if (weekData.length === 0) {
		return { success: false, message: 'No game data found for the week.' };
	}

	// get relevant team data for new object
	const team1Name = weekData.team1?.name;
	const team2Name = weekData.team2?.name;
	const team1Players = weekData.team1?.players;
	const team2Players = weekData.team2?.players;

	// determine the win status for both teams
	let team1WinStatus,
		team2WinStatus,
		winningTeamName,
		winningTeamScore,
		losingTeamName,
		losingTeamScore;
	const team1Score = weekData.team1.totalScore;
	const team2Score = weekData.team2.totalScore;
	if (team1Score > team2Score) {
		team1WinStatus = true;
		team2WinStatus = false;

		winningTeamName = team1Name;
		winningTeamScore = team1Score;
		losingTeamName = team2Name;
		losingTeamScore = team2Score;
	} else {
		team1WinStatus = false;
		team2WinStatus = true;

		winningTeamName = team2Name;
		winningTeamScore = team2Score;
		losingTeamName = team1Name;
		losingTeamScore = team1Score;
	}

	// find the best nfl team for the week
	const matchupsRaw = await valkey.get(matchupsKey);
	if (matchupsRaw.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}
	const matchups: any[] = JSON.parse(matchupsRaw);

	let bestNflTeamScore = 0;
	let bestNflTeamName;
	for (const matchup of matchups) {
		for (const scoreObj of matchup.matchupScores) {
			const [team, score] = Object.entries(scoreObj)[0];
			if ((score as number) > bestNflTeamScore) {
				bestNflTeamScore = score as number;
				bestNflTeamName = team;
			}
		}
	}

	// update the week to the end status
	const updatedWeekData = {
		team1: {
			name: team1Name,
			totalScore: team1Score,
			players: team1Players,
			winStatus: team1WinStatus
		},
		team2: {
			name: team2Name,
			totalScore: team2Score,
			players: team2Players,
			winStatus: team2WinStatus
		},
		status: 'ended',
		winningTeamName: winningTeamName,
		winningTeamScore: winningTeamScore,
		bestNflTeamName: bestNflTeamName,
		bestNflTeamScore: bestNflTeamScore
	};

	// save the results
	await valkey.set(weekDataKey, JSON.stringify(updatedWeekData));

	// update user data for all users in postgres database
	const updateUserProfileStats = async (
		teamName: string,
		teamScore: number,
		userId: string,
		won: boolean
	) => {
		const [userProfile] = await drizzle
			.select({ highestScoringTeamScore: schema.user_profile.highestScoringTeamScore })
			.from(schema.user_profile)
			.where(eq(schema.user_profile.userId, userId));

		const shouldUpdateHighScore = !userProfile || userProfile.highestScoringTeamScore < teamScore;

		await drizzle
			.update(schema.user_profile)
			.set({
				totalWins: sql`${schema.user_profile.totalWins} + ${won ? 1 : 0}`,
				totalLosses: sql`${schema.user_profile.totalLosses} + ${won ? 0 : 1}`,
				highestScoringTeamName: shouldUpdateHighScore ? teamName : undefined,
				highestScoringTeamScore: shouldUpdateHighScore ? teamScore : undefined,
				updatedAt: new Date()
			})
			.where(eq(schema.user_profile.userId, userId));
	};
	for (const userId of Object.keys(users)) {
		const parsedUserData = JSON.parse(users[userId]);
		if (parsedUserData.teamAssignment === winningTeamName) {
			updateUserProfileStats(winningTeamName, winningTeamScore, userId, true);
		} else {
			updateUserProfileStats(losingTeamName, losingTeamScore, userId, false);
		}
	}

	return { success: true, message: `Week ${currentWeek} ended.` };
};
