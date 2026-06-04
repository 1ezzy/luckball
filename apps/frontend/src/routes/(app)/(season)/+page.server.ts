import { fail, type Actions } from '@sveltejs/kit';
import { addUserToWeek } from '@luckball/game-logic';
import { valkey } from '$lib/clients/valkey-client';
import { drizzle } from '$lib/clients/drizzle-client';
import { auth } from '$lib/auth/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const {
		currentWeek,
		currentWeekText,
		seasonType,
		matchupData,
		weekData,
		allUserGameData,
		currentUserGameDataFromId,
		userId,
		weekEvents
	} = await parent();
	const currentUserGameData = userId ? { ...currentUserGameDataFromId, userId } : null;

	const getTeamWithUsernames = (team: { players: string[] }, allUsers: Record<string, string>) => {
		if (!team || !allUsers || !team.players) return { ...team, usernames: [] };
		const usernames = team.players.map((id) => {
			if (!allUsers[id]) return [];
			return JSON.parse(allUsers[id])?.displayName;
		});
		return { ...team, usernames };
	};

	const team1Data = getTeamWithUsernames(weekData?.team1, allUserGameData);
	const team2Data = getTeamWithUsernames(weekData?.team2, allUserGameData);

	const currentWeekData = {
		seasonType: seasonType,
		currentWeekNum: currentWeek,
		currentWeekText: currentWeekText,
		weekEvents: weekEvents,
		weekMatchups: matchupData.matchupData,
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
		currentUserGameData,
		teamData
	};
};

export const actions: Actions = {
	joinWeek: async ({ request }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});
		const userId = session?.user.id;
		if (!userId) {
			return fail(400, { userId, error: 'User ID is required' });
		}

		const data = await request.formData();
		const displayName = data.get('displayName')?.toString();
		if (!displayName) {
			return fail(400, { displayName, error: 'Display name is required' });
		}

		const result = await addUserToWeek(displayName, userId, valkey, drizzle);
		if (!result.success) {
			return fail(400, { displayName, error: result.message });
		}

		return { success: true };
	}
};
