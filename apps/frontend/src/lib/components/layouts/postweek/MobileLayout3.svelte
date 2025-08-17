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
		bestNflTeamName
	} = $props();
</script>

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<WinningTeamCard {winningTeamName} {winningTeamScore} />
	<BestTeamCard {bestNflTeamName} />
	<RecordsCard />
</div>
