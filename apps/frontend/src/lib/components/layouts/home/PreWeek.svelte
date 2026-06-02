<script lang="ts">
	import DisplayNameForm from '$lib/components/home/preweek/DisplayNameForm.svelte';
	import TitleAndPreWeekCopy from '$lib/components/home/preweek/TitleAndPreWeekCopy.svelte';
	import RecordsCard from '$lib/components/records/RecordsCard.svelte';
	import PageShell from '$lib/components/shared/PageShell.svelte';

	let { currentWeekText, displayName, prevDisplayName, weekJoined, recordsData } = $props();
</script>

<div class="md:h-[calc(100vh-4rem)]">
	<PageShell>
		<TitleAndPreWeekCopy {currentWeekText} />
		<hr class="h-[1px] w-full border-0 border-t-2 border-t-black md:hidden" />
		<div class="my-auto flex w-full flex-col gap-16 md:flex-row">
			<DisplayNameForm {weekJoined} {currentWeekText} {displayName} {prevDisplayName} />
			<RecordsCard
				totalWins={recordsData.totalWins}
				totalLosses={recordsData.totalLosses}
				highestScoringTeamName={recordsData.highestScoringTeamName}
				highestScoringTeamScore={recordsData.highestScoringTeamScore}
			/>
		</div>
	</PageShell>
</div>
