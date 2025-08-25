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

<div class="md:h-[calc(100vh-4rem)]">
	{#if weekStatus === WeekStatus.Pending}
		<PageShell>
			<TitleAndPreWeekCopy {currentWeekText} mainPage={false} />
			<div class="my-auto flex flex-col gap-8 md:flex-row">
				<div class="flex flex-1 items-center justify-center">
					<RecordsCard
						{totalWins}
						{totalLosses}
						{highestScoringTeamName}
						{highestScoringTeamScore}
					/>
				</div>
			</div>
		</PageShell>
	{:else if weekStatus === WeekStatus.InProgress}
		<PageShell>
			<TitleAndActiveWeekCopy
				{currentWeekText}
				{weekJoined}
				{userTeamAssignment}
				mainPage={false}
			/>
			<div class="my-auto flex flex-col gap-8 md:flex-row">
				<div class="flex flex-1 items-center justify-center">
					<RecordsCard
						{totalWins}
						{totalLosses}
						{highestScoringTeamName}
						{highestScoringTeamScore}
					/>
				</div>
			</div>
		</PageShell>
	{:else}
		<PageShell>
			<TitleAndPostWeekCopy
				{currentWeekText}
				{displayName}
				{winningTeamName}
				{userTeamName}
				mainPage={false}
			/>
			<div class="flex flex-col gap-8 md:flex-row">
				<div class="flex flex-1 items-center justify-center">
					<RecordsCard
						{totalWins}
						{totalLosses}
						{highestScoringTeamName}
						{highestScoringTeamScore}
					/>
				</div>
			</div>
		</PageShell>
	{/if}
</div>
