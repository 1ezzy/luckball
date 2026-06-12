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
	<div class="my-auto flex w-full flex-col md:flex-row">
		<div class="flex h-full w-full flex-col gap-4 text-center md:text-left">
			<h2 class="text-secondary text-fluid-xl mb-2">Schedule for {currentWeekText}</h2>
			<ScheduleCard {matchups} />
		</div>
	</div>
{/snippet}

<div class="md:h-[calc(100vh-4rem)]">
	{#if weekStatus === WeekStatus.Pending}
		<PageShell>
			<TitleAndPreWeekCopy {currentWeekText} {weekJoined} mainPage={false} />
			{@render schedule()}
		</PageShell>
	{:else if weekStatus === WeekStatus.InProgress}
		<PageShell>
			<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
			{@render schedule()}
		</PageShell>
	{:else}
		<PageShell>
			<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
			{@render schedule()}
		</PageShell>
	{/if}
</div>
