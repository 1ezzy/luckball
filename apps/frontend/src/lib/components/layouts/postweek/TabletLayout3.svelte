<script lang="ts">
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import TitleAndPostWeekCopy from '$lib/components/TitleAndPostWeekCopy.svelte';

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

<div class="grid h-screen w-full flex-1 grid-cols-12">
	<div class="col-span-7 flex flex-col items-center justify-center gap-16 py-16 pl-12"></div>
</div>
