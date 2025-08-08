<script lang="ts">
	import DisplayNameForm from '$lib/components/DisplayNameForm.svelte';
	import Records from '$lib/components/Records.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TitleAndCopy from '$lib/components/TitleAndPreweekCopy.svelte';

	let { weekJoined, seasonPrefix, currentWeek, displayName, matchups, teams, matchupDates } =
		$props();
</script>

<div
	class="grid min-h-screen w-full flex-1 grid-cols-3 xl:mx-auto xl:max-w-[80vw] 2xl:max-w-[70vw]"
>
	<div class="col-span-2 flex flex-col items-center justify-center gap-16 px-16 py-24">
		<TitleAndCopy {seasonPrefix} {currentWeek} />
		<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	</div>
</div>
