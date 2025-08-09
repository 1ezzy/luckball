<script lang="ts">
	import { onMount } from 'svelte';
	import DesktopLayout1 from '$lib/components/layouts/preweek/DesktopLayout1.svelte';
	import TabletLayout1 from '$lib/components/layouts/preweek/TabletLayout1.svelte';
	import MobileLayout1 from '$lib/components/layouts/preweek/MobileLayout1.svelte';
	import DesktopLayout2 from '$lib/components/layouts/activeweek/DesktopLayout2.svelte';
	import TabletLayout2 from '$lib/components/layouts/activeweek/TabletLayout2.svelte';
	import MobileLayout2 from '$lib/components/layouts/activeweek/MobileLayout2.svelte';
	import DesktopLayout3 from '$lib/components/layouts/postweek/DesktopLayout3.svelte';

	let { data } = $props();

	const matchups = data.weekEvents.events.map((week: any) => week.shortName);
	const matchupDates = data.weekEvents.events.map((week: any) => week.date);

	const currentWeek = data.currentWeek;
	const seasonType = data.type;
	const teams = data.weekEvents.teams;
	const weekData = data.weekData;
	const userData = data.userData;
	const userId = data.userId;
	const displayName = $derived(data.displayName);
	const weekJoined = $derived(data.weekJoined);

	const seasonPrefix = $derived(
		(() => {
			switch (seasonType) {
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
		currentWeek,
		displayName,
		userData,
		userId,
		seasonPrefix,
		teams,
		weekJoined,
		weekData
	});

	const weekStatus: string = weekData.status;

	// onMount(() => {
	// 	console.log('page', data.weekData);
	// });
</script>

{#if weekStatus === 'pending'}
	<div class="hidden h-screen lg:block">
		<DesktopLayout1 {...layoutProps} />
	</div>
	<div class="hidden h-screen md:block lg:hidden">
		<TabletLayout1 {...layoutProps} />
	</div>
	<div class="block md:hidden">
		<MobileLayout1 {...layoutProps} />
	</div>
{:else if weekStatus == 'in_progress'}
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
{/if}
