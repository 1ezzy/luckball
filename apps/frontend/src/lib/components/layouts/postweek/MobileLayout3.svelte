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

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndPostWeekCopy {seasonPrefix} {currentWeek} {weekJoined} {teamName} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
</div>
