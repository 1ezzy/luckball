import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import { addUserToWeek, removeUserFromWeek, updateUserDisplayName } from '@luckball/game-logic';
import { WeekStatus } from '@luckball/game-logic/types';
import { valkey } from '$lib/clients/valkey-client';
import { drizzle } from '$lib/clients/drizzle-client';
import { auth } from '$lib/auth/auth';
import type { PageServerLoad } from './$types';
import { setUserBoosts } from '@luckball/game-logic';

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

	const getTeamWithUsernames = (
		team: { players: string[] } | undefined,
		allUsers: Record<string, string>
	) => {
		if (!team || !allUsers || !team.players) {
			return { ...team, usernames: [] };
		}

		const usernames = team.players.map((id) => {
			if (!allUsers[id]) return [];
			return JSON.parse(allUsers[id])?.displayName;
		});
		return { ...team, usernames };
	};

	let team1Data,
		team2Data = null;
	if (weekData?.status === WeekStatus.InProgress) {
		team1Data = getTeamWithUsernames(weekData?.teams[0], allUserGameData);
		team2Data = getTeamWithUsernames(weekData?.teams[1], allUserGameData);
	}

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

	const teamData = [team1Data, team2Data];

	return {
		currentWeekData,
		currentUserGameData,
		teamData
	};
};

function withSession<T>(handler: (userId: string, event: RequestEvent) => Promise<T>) {
	return async (event: RequestEvent) => {
		const session = await auth.api.getSession({
			headers: event.request.headers
		});
		const userId = session?.user.id;
		if (!userId) {
			return fail(401, { error: 'User ID is required' });
		}

		return handler(userId, event);
	};
}

export const actions: Actions = {
	joinWeek: withSession(async (userId, { request }) => {
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
	}),
	leaveWeek: withSession(async (userId) => {
		const result = await removeUserFromWeek(userId, valkey);
		if (!result.success) {
			return fail(400, { userId, error: result.message });
		}

		return { success: true };
	}),
	updateUsername: withSession(async (userId, { request }) => {
		const data = await request.formData();
		const modifiedUsername = data.get('modifiedUsername')?.toString();
		if (!modifiedUsername) {
			return fail(400, { modifiedUsername, error: 'Updated username is required' });
		}

		const result = await updateUserDisplayName(modifiedUsername, userId, valkey, drizzle);
		if (!result.success) {
			return fail(400, { modifiedUsername, error: result.message });
		}

		return { success: true };
	}),
	selectBoosts: withSession(async (userId, { request }) => {
		const data = await request.formData();
		const boostedTeamsString = data.get('boostedTeams')?.toString();
		if (!boostedTeamsString) {
			return fail(400, { boostedTeamsString, error: 'List of boosted teams required' });
		}

		const result = await setUserBoosts(JSON.parse(boostedTeamsString), userId, valkey);
		if (!result.success) {
			return fail(400, { boostedTeamsString, error: result.message });
		}

		return { success: true };
	})
};
