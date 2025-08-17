import { createEspnApiClient } from './api/espn-api';

export const endWeek = async (valkey: any, drizzle: any) => {
	const espnApi = createEspnApiClient();
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();

	const usersKey = `${seasonType}:week:${currentWeek}:users`;
	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const matchupsKey = `${seasonType}:week:${currentWeek}:matchups`;

	// get a list of all the users
	const users = await valkey.hgetall(usersKey);
	if (!users || Object.keys(users).length === 0) {
		return { success: false, message: 'No users to start the week.' };
	}

	// get a list of all the matchups
	const matchups = await valkey.lrange(matchupsKey, 0, -1);
	if (matchups.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}

	// get the week data
	const weekDataRaw = await valkey.get(weekDataKey);
	if (weekDataRaw.length === 0) {
		return { success: false, message: 'No week data found.' };
	}

	const weekData = JSON.parse(weekDataRaw);

	// get relevant team data for new object
	const team1Name = weekData.team1?.name;
	const team2Name = weekData.team2?.name;
	const team1Players = weekData.team1?.players;
	const team2Players = weekData.team2?.players;

	// determine the win status for both teams
	let team1WinStatus, team2WinStatus, winningTeamName, winningTeamScore;
	const team1Score = weekData.team1.totalScore;
	const team2Score = weekData.team2.totalScore;
	if (team1Score > team2Score) {
		team1WinStatus = true;
		team2WinStatus = false;

		winningTeamName = team1Name;
		winningTeamScore = team1Score;
	} else {
		team1WinStatus = false;
		team2WinStatus = true;

		winningTeamName = team2Name;
		winningTeamScore = team2Score;
	}

	// update the user week to the end status
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
		winningTeamScore: winningTeamScore
	};

	// save the results
	await valkey.set(weekDataKey, JSON.stringify(updatedWeekData));

	return { success: true, message: `Week ${currentWeek} started ended.` };
};
