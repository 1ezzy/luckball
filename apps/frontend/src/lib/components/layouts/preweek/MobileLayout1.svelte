<script lang="ts">
	import DisplayNameForm from '$lib/components/preweek/DisplayNameForm.svelte';
	import Records from '$lib/components/shared/Records.svelte';
	import ScheduleCard from '$lib/components/shared/ScheduleCard.svelte';
	import TitleAndPreWeekCopy from '$lib/components/preweek/TitleAndPreWeekCopy.svelte';

	let { matchups, matchupDates, matchupTeams, currentWeekText, displayName, weekJoined } = $props();
</script>

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndPreWeekCopy {currentWeekText} />
	<DisplayNameForm {weekJoined} {currentWeekText} {displayName} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<ScheduleCard {matchups} {matchupDates} {matchupTeams} {currentWeekText} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<Records />
</div>
