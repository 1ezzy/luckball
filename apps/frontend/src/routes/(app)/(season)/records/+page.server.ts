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
		userTeamName: currentUserData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName,
		totalWins: currentUserData?.totalWins,
		totalLosses: currentUserData?.totalLosses,
		highestScoringTeamName: currentUserData?.highestScoringTeamName,
		highestScoringTeamScore: currentUserData?.highestScoringTeamScore
	};
};
