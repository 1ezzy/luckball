<script lang="ts">
	import { onMount } from 'svelte';
	import DesktopLayout1 from '$lib/components/layouts/preweek/DesktopLayout1.svelte';
	import TabletLayout1 from '$lib/components/layouts/preweek/TabletLayout1.svelte';
	import MobileLayout1 from '$lib/components/layouts/preweek/MobileLayout1.svelte';
	import DesktopLayout2 from '$lib/components/layouts/activeweek/DesktopLayout2.svelte';
	import TabletLayout2 from '$lib/components/layouts/activeweek/TabletLayout2.svelte';
	import MobileLayout2 from '$lib/components/layouts/activeweek/MobileLayout2.svelte';
	import DesktopLayout3 from '$lib/components/layouts/postweek/DesktopLayout3.svelte';
	import { WeekStatus } from '$lib/types/redis-types.js';
	import TabletLayout3 from '$lib/components/layouts/postweek/TabletLayout3.svelte';
	import MobileLayout3 from '$lib/components/layouts/postweek/MobileLayout3.svelte';

	let { data } = $props();

	const matchups = data.weekEvents.events.map((week: any) => week.shortName);
	const matchupDates = data.weekEvents.events.map((week: any) => week.date);

	const userId = data.userId;
	const team1Data = data.team1Data;
	const team2Data = data.team2Data;
	const teamName = data.teamName;
	const userTeamName = data.userTeamName;
	const seasonType = data.seasonType;
	const currentWeek = data.currentWeek;
	const teams = data.weekEvents.teams;
	const weekStatus = data.weekStatus;
	const winningTeamName = data.winningTeamName;
	const bestNflTeamName = data.bestNflTeamName;

	const displayName = $derived(data.displayName);
	const weekJoined = $derived(data.weekJoined);

	const seasonPrefix = $derived(
		(() => {
			switch (seasonType.type) {
				case 1:
					return 'Preseason';
				case 3:
					return 'Postseason';
				default:
					return '';
			}
		})()
	);

	const layoutProps = $derived({
		matchups,
		matchupDates,
		userId,
		teams,
		team1Data,
		team2Data,
		teamName,
		userTeamName,
		seasonType,
		seasonPrefix,
		currentWeek,
		displayName,
		weekJoined,
		weekStatus,
		winningTeamName,
		bestNflTeamName
	});

	// onMount(() => {
	// 	console.log('page', weekStatus);
	// });
</script>

{#if weekStatus === WeekStatus.Pending}
	<div class="hidden h-screen lg:block">
		<DesktopLayout1 {...layoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout1 {...layoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout1 {...layoutProps} />
	</div>
{:else if weekStatus == WeekStatus.InProgress}
	<div class="hidden h-screen lg:block">
		<DesktopLayout2 {...layoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout2 {...layoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout2 {...layoutProps} />
	</div>
{:else}
	<div class="hidden h-screen lg:block">
		<DesktopLayout3 {...layoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout3 {...layoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout3 {...layoutProps} />
	</div>
{/if}
