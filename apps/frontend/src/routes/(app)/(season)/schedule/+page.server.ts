import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentWeekText, weekData, matchupData, currentUserDataFromId, userId } = await parent();
	const currentUserData = userId ? { ...currentUserDataFromId, userId } : null;

	return {
		currentWeekText: currentWeekText,
		weekMatchups: matchupData,
		weekStatus: weekData?.status,
		weekJoined: currentUserData?.displayName,
		displayName: currentUserData?.displayName,
		userTeamAssignment: currentUserData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName,
		userTeamName: currentUserData?.teamAssignment
	};
};
