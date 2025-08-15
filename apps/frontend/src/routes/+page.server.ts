import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { addUserToWeek } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
import { getWeekAndUserData } from '$lib/server/valkey';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';

export const load: PageServerLoad = async ({ cookies }) => {
	const getTeamWithUsernames = (team: { players: string[] }) => {
		if (!team || !allUserData) return { ...team, usernames: [] };
		const usernames = team.players.map((id) => allUserData[id]?.displayName).filter(Boolean);
		return { ...team, usernames };
	};

	const userId = cookies.get('userId');

	const espnApi = createEspnApiClient(valkey);
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();

	const [{ weekData, allUserData }, weekEvents] = await Promise.all([
		getWeekAndUserData(seasonType, currentWeek),
		espnApi.getWeekEvents(seasonType, currentWeek)
	]);
	if (!weekData || !allUserData || !weekEvents) {
		return fail(500, { error: 'Could not load week data. Please try again later.' });
	}

	const usersMap = new Map(
		Array.isArray(allUserData)
			? allUserData.map((entry) => {
					try {
						return [entry.key, JSON.parse(entry.value)];
					} catch {
						return [entry.key, null];
					}
				})
			: []
	);
	if (!usersMap || !userId) {
		return fail(500, { error: 'Could not load user data. Please try again later.' });
	}

	const currentUserData = { ...usersMap.get(userId), userId: userId };
	const team1Data = getTeamWithUsernames(weekData?.team1);
	const team2Data = getTeamWithUsernames(weekData?.team2);

	const currentWeekData = {
		seasonType: seasonType,
		currentWeekNum: currentWeek,
		currentWeekText: currentWeekText,
		weekEvents: weekEvents,
		weekStatus: weekData.status,
		lastWinningTeam: weekData.lastWinningTeam,
		winningTeamName: weekData.winningTeamName,
		winningTeamScore: weekData.winningTeamScore,
		bestNflTeamName: weekData.bestNflTeamName,
		bestNflTeamScore: weekData.bestNflTeamScore
	};

	const teamData = {
		team1: team1Data,
		team2: team2Data
	};

	return {
		currentWeekData,
		currentUserData,
		teamData
	};
};

export const actions: Actions = {
	joinWeek: async ({ request, cookies }) => {
		console.log('hit!');
		const data = await request.formData();
		const displayName = data.get('displayName')?.toString();

		if (!displayName) {
			return fail(400, { displayName, error: 'Display name is required' });
		}

		let userId = cookies.get('userId');
		if (!userId) {
			userId = crypto.randomUUID();
			cookies.set('userId', userId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				secure: !dev,
				sameSite: 'strict'
			});
		}

		const result = await addUserToWeek(displayName, userId, valkey);
		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		console.log('joinWeek finished');

		return { success: true };
	}
};
