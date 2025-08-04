<script lang="ts">
	import { onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import DesktopLayout from '$lib/components/layouts/DesktopLayout.svelte';
	import TabletLayout from '$lib/components/layouts/TabletLayout.svelte';
	import MobileLayout from '$lib/components/layouts/MobileLayout.svelte';

	const isDesktop = new MediaQuery('(min-width: 1024px)');
	const isTablet = new MediaQuery('(min-width: 768px) and (max-width: 1023px)');

	let { data } = $props();

	const matchups = data.weekEvents.events.map((week: any) => week.shortName);
	const matchupDates = data.weekEvents.events.map((week: any) => week.date);

	const currentWeek = data.currentWeek;
	const seasonType = data.seasonType;
	const teams = data.weekEvents.teams;
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
		seasonPrefix,
		teams,
		weekJoined
	});

	// onMount(() => {
	// 	console.log(weekInfo);
	// });
</script>

{#if isDesktop.current}
	<DesktopLayout {...layoutProps} />
{:else if isTablet.current}
	<TabletLayout {...layoutProps} />
{:else}
	<MobileLayout {...layoutProps} />
{/if}
