<script lang="ts">
	import TitleAndPostWeekCopy from '$lib/components/postweek/TitleAndPostWeekCopy.svelte';
	import WinningTeamCard from '$lib/components/postweek/WinningTeamCard.svelte';
	import BestTeamCard from '$lib/components/postweek/BestTeamCard.svelte';
	import RecordsCard from '$lib/components/postweek/RecordsCard.svelte';

	let {
		teamName,
		userTeamName,
		seasonPrefix,
		currentWeek,
		displayName,
		winningTeamName,
		bestNflTeamName
	} = $props();
</script>

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndPostWeekCopy {seasonPrefix} {currentWeek} {displayName} {teamName} {userTeamName} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<WinningTeamCard {winningTeamName} />
	<BestTeamCard {bestNflTeamName} />
	<RecordsCard />
</div>
