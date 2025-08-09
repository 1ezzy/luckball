<script lang="ts">
	import DisplayNameForm from '$lib/components/DisplayNameForm.svelte';
	import Records from '$lib/components/Records.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TitleAndPreWeekCopy from '$lib/components/TitleAndPreWeekCopy.svelte';

	let { matchups, matchupDates, teams, seasonPrefix, currentWeek, displayName, weekJoined } =
		$props();
</script>

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndPreWeekCopy {seasonPrefix} {currentWeek} />
	<DisplayNameForm {weekJoined} {seasonPrefix} {currentWeek} {displayName} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<Records />
</div>
