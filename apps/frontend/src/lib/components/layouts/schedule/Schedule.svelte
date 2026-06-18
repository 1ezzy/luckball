<script lang="ts">
	import PageShell from '$lib/components/shared/PageShell.svelte';
	import ScheduleCard from '$lib/components/schedule/ScheduleCard.svelte';
	import { WeekStatus } from '$lib/types/valkey-types';
	import TitleAndPreWeekCopy from '$lib/components/home/preweek/TitleAndPreWeekCopy.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import TitleAndPostWeekCopy from '$lib/components/home/postweek/TitleAndPostWeekCopy.svelte';

	let {
		weekStatus,
		weekJoined,
		matchups,
		currentWeekText,
		userTeamAssignment,
		displayName,
		winningTeamName,
		userTeamName
	} = $props();
</script>

{#snippet schedule()}
	<div class="flex h-full w-full flex-col gap-8 md:my-auto">
		<h2 class="text-secondary text-fluid-xl mb-2">Schedule for {currentWeekText}</h2>
		<ScheduleCard {matchups} />
	</div>
{/snippet}

<div class="md:h-screen">
	{#if weekStatus === WeekStatus.Pending}
		<PageShell>
			<TitleAndPreWeekCopy {currentWeekText} {weekJoined} mainPage={false} />
			{@render schedule()}
		</PageShell>
	{:else if weekStatus === WeekStatus.InProgress}
		<PageShell>
			<TitleAndActiveWeekCopy
				{currentWeekText}
				{weekJoined}
				{userTeamAssignment}
				mainPage={false}
			/>
			{@render schedule()}
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
			{@render schedule()}
		</PageShell>
	{/if}
</div>
