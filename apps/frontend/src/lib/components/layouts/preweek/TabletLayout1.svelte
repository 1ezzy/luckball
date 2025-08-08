<script lang="ts">
	import DisplayNameForm from '$lib/components/DisplayNameForm.svelte';
	import Records from '$lib/components/Records.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TitleAndPreweekCopy from '$lib/components/TitleAndPreweekCopy.svelte';

	let { weekJoined, seasonPrefix, currentWeek, displayName, matchups, teams, matchupDates } =
		$props();
</script>

<div class="grid h-screen w-full flex-1 grid-cols-3">
	<div class="-span-1 flex flex-col items-center justify-center gap-16 px-12 py-16">
		<DisplayNameForm {weekJoined} {seasonPrefix} {currentWeek} {displayName} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<Records />
	</div>
	<div class="col-span-2 flex flex-col items-center justify-center gap-16 py-16 pr-12">
		<TitleAndPreweekCopy {seasonPrefix} {currentWeek} />
		<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	</div>
</div>
