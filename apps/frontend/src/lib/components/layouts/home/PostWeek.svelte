<script lang="ts">
	import BestTeamCard from '$lib/components/home/postweek/BestTeamCard.svelte';
	import RecordsCard from '$lib/components/records/RecordsCard.svelte';
	import TitleAndPostWeekCopy from '$lib/components/home/postweek/TitleAndPostWeekCopy.svelte';
	import WinningTeamCard from '$lib/components/home/postweek/WinningTeamCard.svelte';
	import PageShell from '$lib/components/shared/PageShell.svelte';

	let {
		currentWeekText,
		displayName,
		winningTeamName,
		winningTeamScore,
		userTeamName,
		bestNflTeamName,
		bestNflTeamScore,
		totalWins,
		totalLosses,
		highestScoringTeamName,
		highestScoringTeamScore
	} = $props();
</script>

<div class="md:h-[calc(100vh-4rem)]">
	<PageShell>
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
		<hr class="h-[1px] w-full border-0 border-t-2 border-t-black md:hidden" />
		<div class="flex flex-col gap-8 md:my-auto md:flex-row">
			<div class="flex items-center justify-center md:flex-1">
				<WinningTeamCard {winningTeamName} {winningTeamScore} />
			</div>
			<div class="flex items-center justify-center md:flex-1">
				<BestTeamCard {bestNflTeamName} {bestNflTeamScore} />
			</div>
			<div class="flex items-center justify-center md:flex-1">
				<RecordsCard {totalWins} {totalLosses} {highestScoringTeamName} {highestScoringTeamScore} />
			</div>
		</div>
	</PageShell>
</div>
