<script lang="ts">
	import DisplayNameForm from '$lib/components/DisplayNameForm.svelte';
	import Records from '$lib/components/Records.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TitleAndPostweekCopy from '$lib/components/TitleAndPostWeekCopy.svelte';

	let {
		matchups,
		matchupDates,
		teams,
		team1Data,
		team2Data,
		teamName,
		seasonPrefix,
		currentWeek,
		displayName,
		weekJoined
	} = $props();
</script>

<div class="grid h-screen w-full flex-1 grid-cols-12 xl:mx-auto xl:max-w-[80vw] 2xl:max-w-[70vw]">
	<div class="col-span-2 flex flex-col items-center justify-center gap-16 px-16 py-24">Test</div>
</div>
