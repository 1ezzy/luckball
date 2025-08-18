import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { addUserToWeek } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
import { getMatchupData, getWeekAndUserData } from '$lib/server/valkey';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';

export const load: PageServerLoad = async ({ cookies }) => {
	const getTeamWithUsernames = (team: { players: string[] }, allUsers: Record<string, string>) => {
		if (!team || !allUsers) return { ...team, usernames: [] };
		const usernames = team.players
			.map((id) => JSON.parse(allUsers[id])?.displayName)
			.filter(Boolean);
		return { ...team, usernames };
	};

	const userId = cookies.get('userId');

	const espnApi = createEspnApiClient();
	const { currentWeek, currentWeekText, seasonType } = await espnApi.getActiveWeek();

	const [{ weekData, allUserData }, weekEvents] = await Promise.all([
		getWeekAndUserData(seasonType, currentWeek),
		espnApi.getWeekEvents(seasonType, currentWeek)
	]);
	if (!weekData || !allUserData || !weekEvents) {
		return fail(500, { error: 'Could not load week data. Please try again later.' });
	}

	const matchupData = await getMatchupData(seasonType, currentWeek);

	const currentUserDataFromId = userId
		? allUserData[userId]
			? JSON.parse(allUserData[userId] as string)
			: null
		: null;

	const currentUserData = userId ? { ...currentUserDataFromId, userId } : null;
	const team1Data = getTeamWithUsernames(weekData?.team1, allUserData);
	const team2Data = getTeamWithUsernames(weekData?.team2, allUserData);

	const currentWeekData = {
		seasonType: seasonType,
		currentWeekNum: currentWeek,
		currentWeekText: currentWeekText,
		weekEvents: weekEvents,
		weekMatchups: matchupData,
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

		return { success: true };
	}
};
