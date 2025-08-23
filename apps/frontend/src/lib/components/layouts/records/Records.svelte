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
		winningTeamName
	} = $props();
</script>

<div class="md:h-[calc(100vh-4rem)]">
	{#if weekStatus === WeekStatus.Pending}
		<PageShell>
			<TitleAndPreWeekCopy {currentWeekText} />
			<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
			<div class="flex flex-col gap-8 md:flex-row">
				<div class="flex flex-1 items-center justify-center">
					<RecordsCard />
				</div>
			</div>
		</PageShell>
	{:else if weekStatus === WeekStatus.InProgress}
		<PageShell>
			<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
			<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
			<div class="flex flex-col gap-8 md:flex-row">
				<div class="flex flex-1 items-center justify-center">
					<RecordsCard />
				</div>
			</div>
		</PageShell>
	{:else}
		<PageShell>
			<TitleAndPostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
			<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
			<div class="flex flex-col gap-8 md:flex-row">
				<div class="flex flex-1 items-center justify-center">
					<RecordsCard />
				</div>
			</div>
		</PageShell>
	{/if}
</div>
