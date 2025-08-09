<script lang="ts">
	import DisplayNameForm from '$lib/components/DisplayNameForm.svelte';
	import Records from '$lib/components/Records.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TitleAndPreweekCopy from '$lib/components/TitleAndPreWeekCopy.svelte';

	let { matchups, matchupDates, teams, seasonPrefix, currentWeek, displayName, weekJoined } =
		$props();
</script>

<div class="grid h-screen w-full flex-1 grid-cols-12">
	<div class="col-span-3 flex flex-col items-center justify-center gap-16 py-16 pl-12">
		<DisplayNameForm {weekJoined} {seasonPrefix} {currentWeek} {displayName} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<Records />
	</div>
	<div class="w-[1px] grid-cols-1 justify-self-center bg-white"></div>
	<div class="col-span-8 flex flex-col items-center justify-center gap-16 py-16 pr-12">
		<TitleAndPreweekCopy {seasonPrefix} {currentWeek} />
		<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	</div>
</div>
