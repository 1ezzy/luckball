import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const {
		currentWeekText,
		weekData,
		matchupData,
		currentUserGameDataFromId,
		userId,
		userProfileData
	} = await parent();
	const currentUserGameData = userId ? { ...currentUserGameDataFromId, userId } : null;

	return {
		currentWeekText: currentWeekText,
		weekMatchups: matchupData,
		weekStatus: weekData?.status,
		weekJoined: currentUserGameData?.displayName,
		currentDisplayName: currentUserGameData?.displayName,
		userTeamAssignment: currentUserGameData?.teamAssignment,
		userTeamName: currentUserGameData?.teamAssignment,
		winningTeamName: weekData?.winningTeamName,
		totalWins: userProfileData?.totalWins,
		totalLosses: userProfileData?.totalLosses,
		highestScoringTeamName: userProfileData?.highestScoringTeamName,
		highestScoringTeamScore: userProfileData?.highestScoringTeamScore
	};
};
