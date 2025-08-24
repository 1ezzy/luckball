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

<div class="md:h-[calc(100vh-4rem)]">
	{#if weekStatus === WeekStatus.Pending}
		<PageShell>
			<TitleAndPreWeekCopy {currentWeekText} />
			<ScheduleCard {matchups} {currentWeekText} />
		</PageShell>
	{:else if weekStatus === WeekStatus.InProgress}
		<PageShell>
			<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
			<ScheduleCard {matchups} {currentWeekText} showScores />
		</PageShell>
	{:else}
		<PageShell>
			<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
			<ScheduleCard {matchups} {currentWeekText} showScores />
		</PageShell>
	{/if}
</div>
