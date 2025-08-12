import { fail, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { addUserToWeek } from '@luckball/game-logic';
import { redis } from '$lib/clients/redis-client';
import { getWeekAndUserData } from '$lib/server/redis';
import { createEspnApiClient } from '@luckball/game-logic/src/api/espn-api';

export const load: PageServerLoad = async ({ cookies }) => {
	const espnApi = createEspnApiClient(redis);
	const { currentWeek, seasonType } = await espnApi.getActiveWeek();
	const userId = cookies.get('userId');

	const [{ weekData, allUserData }, weekEvents] = await Promise.all([
		getWeekAndUserData(seasonType.type, currentWeek),
		espnApi.getWeekEvents(seasonType.type, currentWeek)
	]);

	const userData = userId && allUserData ? allUserData[userId] : null;

	const getTeamWithUsernames = (team: { players: string[] }) => {
		if (!team || !allUserData) return { ...team, usernames: [] };
		const usernames = team.players.map((id) => allUserData[id]?.displayName).filter(Boolean);
		return { ...team, usernames };
	};

	if (userData && userId && weekData) {
		const team1Data = getTeamWithUsernames(weekData.team1);
		const team2Data = getTeamWithUsernames(weekData.team2);

		let teamName = '';
		if (weekData.team1?.players.includes(userId)) {
			teamName = weekData.team1.name;
		} else if (weekData.team2?.players.includes(userId)) {
			teamName = weekData.team2.name;
		}

		const weekStatus = weekData.status;

		return {
			weekJoined: true,
			displayName: userData.displayName,
			userId: userId,
			team1Data,
			team2Data,
			teamName,
			userTeamName: userData.teamAssignment,
			seasonType,
			currentWeek,
			weekEvents,
			weekStatus,
			winningTeamName: weekData.winningTeam,
			bestNflTeamName: weekData.bestNflTeam
		};
	} else {
		const team1Data = weekData ? getTeamWithUsernames(weekData.team1) : null;
		const team2Data = weekData ? getTeamWithUsernames(weekData.team2) : null;

		const weekStatus = weekData?.status;

		return {
			weekJoined: false,
			displayName: null,
			userId: null,
			team1Data,
			team2Data,
			teamName: '',
			seasonType,
			currentWeek,
			weekEvents,
			weekStatus
		};
	}
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

		const result = await addUserToWeek(displayName, userId, redis);

		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	}
};
