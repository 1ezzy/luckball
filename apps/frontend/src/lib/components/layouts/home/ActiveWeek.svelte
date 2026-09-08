<script lang="ts">
	import BoostsCard from '$lib/components/home/activeweek/BoostsCard.svelte';
	import BoostSelectionDialog from '$lib/components/home/activeweek/BoostSelectionDialog.svelte';
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';
	import type { Team } from '@luckball/game-logic/types';

	let {
		matchups,
		teamData,
		userTeamAssignment,
		currentWeekText,
		displayName,
		weekJoined,
		userBoosts
	} = $props();

	let personalTeam = $derived(
		teamData?.filter((team: Team) => team.name === userTeamAssignment)[0]
	);
	let opponentTeam = $derived(
		teamData?.filter((team: Team) => team.name !== userTeamAssignment)[0]
	);
</script>

{#snippet teamCards()}
	<div class="grid grid-rows-[min-content_auto] w-full gap-1 md:flex-1 items-center">
		<h3 class="text-secondary text-fluid-lg mb-2 w-full whitespace-nowrap">This Week's Lineups</h3>
		<div class="flex h-full flex-col gap-8 overflow-y-scroll md:flex-row">
			<TeamCard teamPlayerData={personalTeam} {displayName} {matchups} />
			<TeamCard teamPlayerData={opponentTeam} {displayName} {matchups} />
		</div>
	</div>
{/snippet}

{#snippet boostsCard()}
	<div class="grid grid-rows-[min-content_auto] w-full gap-1 md:flex-1 items-center">
		<h3 class="text-secondary text-fluid-lg mb-2 w-full whitespace-nowrap">Your Score Modifiers</h3>
		<BoostsCard boosts={userBoosts} />
	</div>
{/snippet}

<BoostSelectionDialog weekBoosted={userBoosts} {personalTeam} {matchups}></BoostSelectionDialog>

<WeekShell>
	{#snippet copy()}
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	{/snippet}
	{#if userBoosts}
		<div class="grid grid-rows-[1fr_auto] gap-16 2xl:gap-24 overflow-y-scroll">
			{@render boostsCard()}
			{@render teamCards()}
		</div>
	{:else}
		{@render teamCards()}
	{/if}
</WeekShell>
