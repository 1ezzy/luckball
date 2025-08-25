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

<div class="hidden h-[calc(100vh-4rem)] lg:block">
	<PageShell>
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
		<div class=" flex flex-col gap-8 md:flex-row">
			<div class="flex flex-1 items-center justify-center">
				<WinningTeamCard {winningTeamName} {winningTeamScore} />
			</div>
			<div class="flex flex-1 items-center justify-center">
				<BestTeamCard {bestNflTeamName} {bestNflTeamScore} />
			</div>
			<div class="justify-centerr flex flex-1 items-center">
				<RecordsCard {totalWins} {totalLosses} {highestScoringTeamName} {highestScoringTeamScore} />
			</div>
		</div>
	</PageShell>
</div>
<div class="hidden h-[calc(100vh-4rem)] md:block lg:hidden">
	<PageShell>
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
		<div class=" flex flex-col gap-8 md:flex-row">
			<div class="flex flex-1 items-center justify-center">
				<WinningTeamCard {winningTeamName} {winningTeamScore} />
			</div>
			<div class="flex flex-1 items-center justify-center">
				<BestTeamCard {bestNflTeamName} {bestNflTeamScore} />
			</div>
			<div class="flex flex-1 items-center justify-center">
				<RecordsCard {totalWins} {totalLosses} {highestScoringTeamName} {highestScoringTeamScore} />
			</div>
		</div>
	</PageShell>
</div>
<div class="block md:hidden">
	<PageShell>
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<WinningTeamCard {winningTeamName} {winningTeamScore} />
		<BestTeamCard {bestNflTeamName} {bestNflTeamScore} />
		<RecordsCard {totalWins} {totalLosses} {highestScoringTeamName} {highestScoringTeamScore} />
	</PageShell>
</div>
