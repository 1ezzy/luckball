<script lang="ts">
	import DisplayNameForm from '$lib/components/home/preweek/DisplayNameForm.svelte';
	import TitleAndPreWeekCopy from '$lib/components/home/preweek/TitleAndPreWeekCopy.svelte';
	import RecordsCard from '$lib/components/records/RecordsCard.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';

	let { currentWeekText, displayName, prevDisplayName, weekJoined, recordsData } = $props();
</script>

<WeekShell>
	{#snippet copy()}
		<TitleAndPreWeekCopy {currentWeekText} {weekJoined} />
	{/snippet}
	<div class="flex h-full w-full flex-col gap-8 md:flex-row">
		<DisplayNameForm {weekJoined} {currentWeekText} {displayName} {prevDisplayName} />
		<RecordsCard
			totalWins={recordsData.totalWins}
			totalLosses={recordsData.totalLosses}
			highestScoringTeamName={recordsData.highestScoringTeamName}
			highestScoringTeamScore={recordsData.highestScoringTeamScore}
		/>
	</div>
</WeekShell>
