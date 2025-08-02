import { redis } from '$lib/clients/redis-client';
import { faker } from '@faker-js/faker';
import { json } from '@sveltejs/kit';

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

	for (let i = 0; i < teams.length; i += 2) {
		const team1 = teams[i];
		const team2 = teams[i + 1];

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

export async function POST({ params }) {
	const weekNumber = params.weekNumber;
	const seasonType = params.seasonType;

	// get a list of all the users
	const users = await redis.hgetall(`${seasonType}:week:${weekNumber}:users`);
	if (!users) {
		return json({ error: 'Users object does not exist for this week' }, { status: 400 });
	}
	const userIds = Object.keys(users);
	if (userIds.length === 0) {
		return json({ error: 'No users to assign' }, { status: 400 });
	}

	// shuffle the list of users and split the list into two lists
	const shuffledUsers = shuffleArray(userIds);
	const midpoint = Math.ceil(shuffledUsers.length / 2);
	const team1Players = shuffledUsers.slice(0, midpoint);
	const team2Players = shuffledUsers.slice(midpoint);

	// generate a random team name for each team
	const team1Name = generateTeamName();
	const team2Name = generateTeamName();

	// get the matchup data for the week
	const weekDataRes = await fetch(`/api/espn/${seasonType}/week/${weekNumber}`);
	const weekData = await weekDataRes.json();
	const nflTeams = weekData.events.map((week) => week.shortName);

	// randomly select one team from each matchup to assign to both teams
	const [team1NflTeams, team2NflTeams] = shuffleNflTeams(nflTeams);

	// create team data
	const team1Data = {
		players: team1Players,
		nflTeams: team1NflTeams,
		totalScore: 0,
		wins: 0
	};

	const team2Data = {
		players: team2Players,
		nflTeams: team2NflTeams,
		totalScore: 0,
		wins: 0
	};

	// save the team data to redis
	await redis.hset(`${seasonType}:week:${weekNumber}:teams`, {
		[team1Name]: JSON.stringify(team1Data),
		[team2Name]: JSON.stringify(team2Data)
	});

	// update each user to have a team assignment for the week
	const userUpdates: Record<string, string> = {};
	team1Players.forEach((userId) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const userData = JSON.parse(users[userId] as any);
		userData.teamAssignment = team1Name;
		userUpdates[userId] = JSON.stringify(userData);
	});

	team2Players.forEach((userId) => {
		const userData = JSON.parse(users[userId] as any);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		userData.teamAssignment = team2Name;
		userUpdates[userId] = JSON.stringify(userData);
	});

	// overwrite data for users with new user data that includes teams
	await redis.hset(`${seasonType}:week:${weekNumber}:users`, userUpdates);

	// update the status of the round
	const startTime = new Date();
	const endTime = new Date(startTime);

	const daysUntilTuesday = (2 - endTime.getDay() + 7) % 7;
	endTime.setDate(endTime.getDate() + daysUntilTuesday);
	endTime.setHours(0, 0, 0, 0);

	await redis.set(
		`${seasonType}:week:${weekNumber}:status`,
		JSON.stringify({
			status: 'started',
			startTime: startTime,
			endTime: endTime
		})
	);

	return json({
		success: true,
		teams: [team1Name, team2Name]
	});
}
