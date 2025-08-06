<script lang="ts">
	import { onMount } from 'svelte';
	import DesktopLayout from '$lib/components/layouts/DesktopLayout.svelte';
	import TabletLayout from '$lib/components/layouts/TabletLayout.svelte';
	import MobileLayout from '$lib/components/layouts/MobileLayout.svelte';

	let { data } = $props();

	const matchups = data.weekEvents.events.map((week: any) => week.shortName);
	const matchupDates = data.weekEvents.events.map((week: any) => week.date);

	const currentWeek = data.currentWeek;
	const seasonType = data.type;
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

<div class="hidden lg:block">
	<DesktopLayout {...layoutProps} />
</div>
<div class="hidden md:block lg:hidden">
	<TabletLayout {...layoutProps} />
</div>
<div class="block md:hidden">
	<MobileLayout {...layoutProps} />
</div>
