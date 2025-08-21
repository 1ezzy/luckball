<script lang="ts">
	import TitleAndPostWeekCopy from '$lib/components/postweek/TitleAndPostWeekCopy.svelte';
	import WinningTeamCard from '$lib/components/postweek/WinningTeamCard.svelte';
	import BestTeamCard from '$lib/components/postweek/BestTeamCard.svelte';
	import RecordsCard from '$lib/components/postweek/RecordsCard.svelte';

	let {
		currentWeekText,
		displayName,
		winningTeamName,
		winningTeamScore,
		userTeamName,
		bestNflTeamName,
		bestNflTeamScore
	} = $props();
</script>

<div class="flex h-screen w-full flex-1 flex-col justify-center">
	<div class="flex flex-row items-center justify-center gap-16 px-12 pb-16">
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
	</div>
	<div class="pb-26 grid h-full max-h-[50vh] grid-cols-3 gap-x-12 px-12">
		<div class="col-span-1 flex h-full items-center justify-center">
			<WinningTeamCard {winningTeamName} {winningTeamScore} />
		</div>
		<div class="col-span-1 flex h-full items-center justify-center">
			<BestTeamCard {bestNflTeamName} {bestNflTeamScore} />
		</div>
		<div class="col-span-1 flex h-full items-center justify-center">
			<RecordsCard />
		</div>
	</div>
</div>
