<script lang="ts">
	import { onMount } from 'svelte';
	import { WeekStatus } from '$lib/types/valkey-types.js';
	import PreWeek from '$lib/components/layouts/home/PreWeek.svelte';
	import ActiveWeek from '$lib/components/layouts/home/ActiveWeek.svelte';
	import PostWeek from '$lib/components/layouts/home/PostWeek.svelte';

	let { data } = $props();

	// declaring objects passed through the page
	const currentUserData = $derived(data.currentUserData);
	const currentWeekData = $derived(data.currentWeekData);
	const teamData = $derived(data.teamData);

	const matchups = $derived(currentWeekData?.weekMatchups);

	const displayName = $derived(currentUserData?.displayName);
	const prevDisplayName = $derived(currentUserData?.prevDisplayName);

	// declaring prop objects for each layout
	const preWeekLayoutProps = $derived({
		matchups: matchups?.matchupData,
		matchupTeams: matchups?.matchupData?.map((matchup) => matchup.teams),
		teamData: teamData,
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: displayName,
		prevDisplayName: prevDisplayName,
		weekJoined: displayName
	});

	const activeWeekLayoutProps = $derived({
		matchups: matchups?.matchupData,
		matchupTeams: matchups?.matchupData?.map((matchup) => matchup.teams),
		teamData: teamData,
		userTeamAssignment: currentUserData?.teamAssignment,
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: displayName,
		weekJoined: displayName
	});

	const postWeekLayoutProps = $derived({
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: displayName,
		winningTeamName: currentWeekData?.winningTeamName,
		winningTeamScore: currentWeekData?.winningTeamScore,
		bestNflTeamName: currentWeekData?.bestNflTeamName,
		bestNflTeamScore: currentWeekData?.bestNflTeamScore,
		userTeamName: currentUserData?.teamAssignment,
		totalWins: currentUserData?.totalWins,
		totalLosses: currentUserData?.totalLosses,
		highestScoringTeamName: currentUserData?.highestScoringTeamName,
		highestScoringTeamScore: currentUserData?.highestScoringTeamScore
	});

	// onMount(() => {
	// 	console.log('page', data.currentWeekData?.weekScores);
	// });
</script>

{#if currentWeekData?.weekStatus === WeekStatus.Pending}
	<PreWeek {...preWeekLayoutProps} />
{:else if currentWeekData?.weekStatus == WeekStatus.InProgress}
	<ActiveWeek {...activeWeekLayoutProps} />
{:else}
	<PostWeek {...postWeekLayoutProps} />
{/if}
