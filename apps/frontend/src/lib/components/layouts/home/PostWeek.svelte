<script lang="ts">
	import BestTeamCard from '$lib/components/home/postweek/BestTeamCard.svelte';
	import RecordsCard from '$lib/components/records/RecordsCard.svelte';
	import TitleAndPostWeekCopy from '$lib/components/home/postweek/TitleAndPostWeekCopy.svelte';
	import WinningTeamCard from '$lib/components/home/postweek/WinningTeamCard.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';

	let {
		currentWeekText,
		displayName,
		winningTeamName,
		winningTeamScore,
		userTeamName,
		bestNflTeamName,
		bestNflTeamScore,
		recordsData
	} = $props();
</script>

<WeekShell>
	{#snippet copy()}
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
	{/snippet}
	<div class="flex h-full flex-col gap-8 md:flex-row">
		<div class="flex items-center justify-center md:flex-1">
			<WinningTeamCard {winningTeamName} {winningTeamScore} />
		</div>
		<div class="flex items-center justify-center md:flex-1">
			<BestTeamCard {bestNflTeamName} {bestNflTeamScore} />
		</div>
		<div class="flex items-center justify-center md:flex-1">
			<RecordsCard
				totalWins={recordsData.totalWins}
				totalLosses={recordsData.totalLosses}
				highestScoringTeamName={recordsData.highestScoringTeamName}
				highestScoringTeamScore={recordsData.highestScoringTeamScore}
			/>
		</div>
	</div>
</WeekShell>
