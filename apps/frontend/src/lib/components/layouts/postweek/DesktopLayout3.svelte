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

<div
	class="flex h-screen w-full flex-1 flex-col gap-16 xl:mx-auto xl:max-w-[80vw] 2xl:max-w-[70vw]"
>
	<div class="flex flex-row items-center justify-center gap-8 px-16 pt-20">
		<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
	</div>
	<div class="grid h-full grid-cols-3 gap-x-16 px-16 pb-20">
		<div class="col-span-1 flex h-full w-full items-center justify-center">
			<WinningTeamCard {winningTeamName} {winningTeamScore} />
		</div>
		<div class="col-span-1 flex h-full w-full items-center justify-center">
			<BestTeamCard {bestNflTeamName} />
		</div>
		<div class="col-span-1 flex h-full w-full items-center justify-center">
			<RecordsCard />
		</div>
	</div>
</div>
