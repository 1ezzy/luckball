<script lang="ts">
	import DisplayNameForm from '$lib/components/DisplayNameForm.svelte';
	import Records from '$lib/components/Records.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TitleAndCopy from '$lib/components/TitleAndCopy.svelte';

	let { weekJoined, seasonPrefix, currentWeek, displayName, matchups, teams, matchupDates } =
		$props();
</script>

<div class="grid w-full flex-1 grid-cols-3">
	<div class="max-h-3xl col-span-1 flex flex-col items-center justify-between px-16 py-24">
		<DisplayNameForm {weekJoined} {seasonPrefix} {currentWeek} {displayName} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<Records />
	</div>
	<div class="col-span-2 flex flex-col items-center gap-16 px-16 py-24">
		<TitleAndCopy {seasonPrefix} {currentWeek} />
		<ScheduleCard {matchups} {teams} {matchupDates} />
	</div>
</div>
