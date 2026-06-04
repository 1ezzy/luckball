import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentWeekText, weekData, matchupData, currentUserGameDataFromId, userId } =
		await parent();
	const currentUserGameData = userId ? { ...currentUserGameDataFromId, userId } : null;

	return {
		currentWeekText: currentWeekText,
		weekMatchups: matchupData,
		weekStatus: weekData?.status,
		weekJoined: currentUserGameData?.displayName,
		currentDisplayName: currentUserGameData?.displayName,
		userTeamAssignment: currentUserGameData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName,
		userTeamName: currentUserGameData?.teamAssignment
	};
};
