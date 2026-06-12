<script lang="ts">
	import PageShell from '$lib/components/shared/PageShell.svelte';
	import { WeekStatus } from '$lib/types/valkey-types';
	import TitleAndPreWeekCopy from '$lib/components/home/preweek/TitleAndPreWeekCopy.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import TitleAndPostWeekCopy from '$lib/components/home/postweek/TitleAndPostWeekCopy.svelte';
	import RecordsCard from '$lib/components/records/RecordsCard.svelte';

	let {
		weekStatus,
		weekJoined,
		currentWeekText,
		userTeamAssignment,
		displayName,
		userTeamName,
		winningTeamName,
		totalWins,
		totalLosses,
		highestScoringTeamName,
		highestScoringTeamScore
	} = $props();
</script>

{#snippet records()}
	<div class="my-auto flex flex-col gap-8 md:flex-row">
		<div class="flex h-full w-full flex-col gap-4">
			<h2 class="text-secondary text--fluid-xl mb-2">Personal Records</h2>
			<RecordsCard {totalWins} {totalLosses} {highestScoringTeamName} {highestScoringTeamScore} />
		</div>
	</div>
{/snippet}

<div class="md:h-[calc(100vh-4rem)]">
	{#if weekStatus === WeekStatus.Pending}
		<PageShell>
			<TitleAndPreWeekCopy {currentWeekText} {weekJoined} mainPage={false} />
			{@render records()}
		</PageShell>
	{:else if weekStatus === WeekStatus.InProgress}
		<PageShell>
			<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
			{@render records()}
		</PageShell>
	{:else}
		<PageShell>
			<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
			{@render records()}
		</PageShell>
	{/if}
</div>
