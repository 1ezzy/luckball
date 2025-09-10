import { faker } from '@faker-js/faker';
import { createEspnApiClient } from './api/espn-api';

const generateTeamName = (): string => {
	const adj = faker.word.adjective({ length: { min: 5, max: 8 }, strategy: 'fail' });
	const noun = faker.word.noun({ length: { min: 5, max: 8 }, strategy: 'fail' });
	return `${adj}-${noun}`;
};

const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const shuffleNflTeams = (teams: string[]): [string[], string[]] => {
	const team1Teams: string[] = [];
	const team2Teams: string[] = [];

	for (let i = 0; i < teams.length; i++) {
		const teamSplit = teams[i].split(' ');
		const team1 = teamSplit[0];
		const team2 = teamSplit[2];

		if (Math.random() < 0.5) {
			team1Teams.push(team1);
			team2Teams.push(team2);
		} else {
			team1Teams.push(team2);
			team2Teams.push(team1);
		}
	}

	return [team1Teams, team2Teams];
};

export const startActiveWeek = async (valkey: any) => {
	const espnApi = createEspnApiClient();
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();

	const usersKey = `${seasonType}:week:${currentWeek}:users`;
	const weekDataKey = `${seasonType}:week:${currentWeek}:data`;
	const matchupsKey = `${seasonType}:week:${currentWeek}:matchups`;

	const currentWeekData = await valkey.get(weekDataKey);
	if (JSON.parse(currentWeekData).status !== 'pending') {
		return { success: false, message: 'Week not started - current week data status not "pending"' };
	}

	// get a list of all the users
	const users = await valkey.hkeys(usersKey);
	if (!users || Object.keys(users).length === 0) {
		return { success: false, message: 'No users to start the week.' };
	}

	// get a list of all the matchups
	const matchupsRaw = await valkey.get(matchupsKey);
	if (matchupsRaw.length === 0) {
		return { success: false, message: 'No NFL matchups found for the week.' };
	}
	const matchups = JSON.parse(matchupsRaw);

	const updatedMatchups = matchups.map((matchup: any) => {
		const scoresObjList = matchup.teams.map((team: string) => ({
			[team]: 0
		}));
		return {
			...matchup,
			matchupScores: scoresObjList
		};
	});

	// shuffle the list of users and split the list into two lists
	const shuffledUsers = shuffleArray(users);
	const midpoint = Math.ceil(shuffledUsers.length / 2);
	const team1Players = shuffledUsers.slice(0, midpoint);
	const team2Players = shuffledUsers.slice(midpoint);

	// generate a random team name for each team
	const team1Name = generateTeamName();
	const team2Name = generateTeamName();

	// update each player's teamAssignment
	for (const userId of team1Players) {
		const userDataString = await valkey.hget(usersKey, userId);
		if (userDataString) {
			const userData = JSON.parse(userDataString);
			userData.teamAssignment = team1Name;
			await valkey.hset(usersKey, userId, JSON.stringify(userData));
		}
	}

	for (const userId of team2Players) {
		const userDataString = await valkey.hget(usersKey, userId);
		if (userDataString) {
			const userData = JSON.parse(userDataString);
			userData.teamAssignment = team2Name;
			await valkey.hset(usersKey, userId, JSON.stringify(userData));
		}
	}

	// randomly select one team from each matchup to assign to both teams
	const matchupEvents = matchups.map((matchup: any) => matchup.event);
	const [team1NflTeams, team2NflTeams] = shuffleNflTeams(matchupEvents);

	// create week data with new teams
	const weekData = {
		team1: {
			name: team1Name,
			players: team1Players,
			nflTeams: team1NflTeams,
			totalScore: 0,
			wins: 0
		},
		team2: {
			name: team2Name,
			players: team2Players,
			nflTeams: team2NflTeams,
			totalScore: 0,
			wins: 0
		},
		status: 'in_progress'
	};

	// save the week data to valkey
	await valkey.set(weekDataKey, JSON.stringify(weekData));

	// save the matchup data to valkey
	await valkey.set(`${seasonType}:week:${currentWeek}:matchups`, JSON.stringify(updatedMatchups));

	return { success: true, message: `Week ${currentWeek} started successfully.` };
};
