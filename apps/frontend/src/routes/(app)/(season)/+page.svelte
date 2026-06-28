<script lang="ts">
	import { WeekStatus } from '@luckball/game-logic/types';
	import PreWeek from '$lib/components/layouts/home/PreWeek.svelte';
	import ActiveWeek from '$lib/components/layouts/home/ActiveWeek.svelte';
	import PostWeek from '$lib/components/layouts/home/PostWeek.svelte';

	let { data } = $props();

	// declaring objects passed through the page
	const currentUserGameData = $derived(data.currentUserGameData);
	const currentWeekData = $derived(data.currentWeekData);
	const teamData = $derived(data.teamData);
	const userProfileData = $derived(data.userProfileData);

	const matchups = $derived(currentWeekData?.weekMatchups);

	const currentDisplayName = $derived(currentUserGameData?.displayName);
	const prevDisplayName = $derived(userProfileData?.prevDisplayName);

	// declaring prop objects for each layout
	const preWeekLayoutProps = $derived({
		matchups: matchups,
		matchupTeams: matchups?.map((matchup) => matchup.teams),
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: currentDisplayName,
		prevDisplayName: prevDisplayName,
		weekJoined: currentDisplayName,
		recordsData: {
			totalWins: userProfileData?.totalWins,
			totalLosses: userProfileData?.totalLosses,
			highestScoringTeamName: userProfileData?.highestScoringTeamName,
			highestScoringTeamScore: userProfileData?.highestScoringTeamScore
		}
	});

	const activeWeekLayoutProps = $derived({
		matchups: matchups,
		matchupTeams: matchups?.map((matchup) => matchup.teams),
		teamData: teamData,
		userTeamAssignment: currentUserGameData?.teamAssignment,
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: currentDisplayName,
		weekJoined: currentDisplayName,
		weekBoosted: currentUserGameData.boosts
	});

	const postWeekLayoutProps = $derived({
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: currentDisplayName,
		winningTeamName: currentWeekData?.winningTeamName,
		winningTeamScore: currentWeekData?.winningTeamScore,
		bestNflTeamName: currentWeekData?.bestNflTeamName,
		bestNflTeamScore: currentWeekData?.bestNflTeamScore,
		userTeamName: currentUserGameData?.teamAssignment,
		recordsData: {
			totalWins: userProfileData?.totalWins,
			totalLosses: userProfileData?.totalLosses,
			highestScoringTeamName: userProfileData?.highestScoringTeamName,
			highestScoringTeamScore: userProfileData?.highestScoringTeamScore
		}
	});
</script>

{#if currentWeekData?.weekStatus === WeekStatus.Pending}
	<PreWeek {...preWeekLayoutProps} />
{:else if currentWeekData?.weekStatus == WeekStatus.InProgress}
	<ActiveWeek {...activeWeekLayoutProps} />
{:else}
	<PostWeek {...postWeekLayoutProps} />
{/if}
