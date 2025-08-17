<script lang="ts">
	import { onMount } from 'svelte';
	import DesktopLayout1 from '$lib/components/layouts/preweek/DesktopLayout1.svelte';
	import TabletLayout1 from '$lib/components/layouts/preweek/TabletLayout1.svelte';
	import MobileLayout1 from '$lib/components/layouts/preweek/MobileLayout1.svelte';
	import DesktopLayout2 from '$lib/components/layouts/activeweek/DesktopLayout2.svelte';
	import TabletLayout2 from '$lib/components/layouts/activeweek/TabletLayout2.svelte';
	import MobileLayout2 from '$lib/components/layouts/activeweek/MobileLayout2.svelte';
	import DesktopLayout3 from '$lib/components/layouts/postweek/DesktopLayout3.svelte';
	import { WeekStatus } from '$lib/types/valkey-types.js';
	import TabletLayout3 from '$lib/components/layouts/postweek/TabletLayout3.svelte';
	import MobileLayout3 from '$lib/components/layouts/postweek/MobileLayout3.svelte';

	let { data } = $props();

	// declaring objects passed through the page
	const currentUserData = $derived(data.currentUserData);
	const currentWeekData = $derived(data.currentWeekData);
	const teamData = $derived(data.teamData);

	const matchups = $derived(currentWeekData?.weekEvents.events.map((week: any) => week.shortName));
	const matchupDates = $derived(currentWeekData?.weekEvents.events.map((week: any) => week.date));

	const displayName = $derived(currentUserData?.displayName);

	// declaring prop objects for each layout
	const preWeekLayoutProps = $derived({
		matchups: matchups,
		matchupDates: matchupDates,
		matchupTeams: data.currentWeekData?.weekEvents.teams,
		teamData: teamData,
		currentWeekText: currentWeekData?.currentWeekText,
		displayName: displayName,
		weekJoined: displayName
	});

	const activeWeekLayoutProps = $derived({
		matchups: matchups,
		matchupDates: matchupDates,
		matchupTeams: data.currentWeekData?.weekEvents.teams,
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
		userTeamName: currentUserData?.teamAssignment
	});

	// onMount(() => {
	// 	console.log('page', currentWeekData);
	// });
</script>

{#if currentWeekData?.weekStatus === WeekStatus.Pending}
	<div class="hidden h-screen lg:block">
		<DesktopLayout1 {...preWeekLayoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout1 {...preWeekLayoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout1 {...preWeekLayoutProps} />
	</div>
{:else if currentWeekData?.weekStatus == WeekStatus.InProgress}
	<div class="hidden h-screen lg:block">
		<DesktopLayout2 {...activeWeekLayoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout2 {...activeWeekLayoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout2 {...activeWeekLayoutProps} />
	</div>
{:else}
	<div class="hidden h-screen lg:block">
		<DesktopLayout3 {...postWeekLayoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout3 {...postWeekLayoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout3 {...postWeekLayoutProps} />
	</div>
{/if}
