<script lang="ts">
	import BoostsCard from '$lib/components/home/activeweek/BoostsCard.svelte';
	import BoostSelectionDialog from '$lib/components/home/activeweek/BoostSelectionDialog.svelte';
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';
	import { ArrowBigUpDash, ChessQueen } from '@lucide/svelte';
	import type { Team } from '@luckball/game-logic/types';
	import { ToggleGroup, ToggleOption, TogglePanel } from 'svelte-ux';

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

{#snippet secondaryNavAndPanels()}
	<ToggleGroup
		variant="default"
		size="lg"
		inset
		vertical
		classes={{
			root: 'h-full grid grid-cols-[min-content_auto] gap-12 2xl:gap-16',
			options: 'h-fit p-0 gap-4 rounded-md',
			option: 'h-fit'
		}}
	>
		<ToggleOption value="teams">
			<span class="flex flex-row gap-2 items-center">
				<ChessQueen /> Lineups
			</span>
		</ToggleOption>
		<ToggleOption value="boosts">
			<span class="flex flex-row gap-2 items-center">
				<ArrowBigUpDash /> Boosts
			</span>
		</ToggleOption>
		<svelte:fragment slot="panes">
			<TogglePanel>{@render teamCards()}</TogglePanel>
			<TogglePanel>{@render boostsCard()}</TogglePanel>
		</svelte:fragment>
	</ToggleGroup>
{/snippet}

{#snippet teamCards()}
	<div class="grid grid-rows-[min-content_auto] w-full items-center gap-1 overflow-hidden">
		<h3 class="text-secondary text-fluid-lg mb-2 w-full whitespace-nowrap">This Week's Lineups</h3>
		<div class="flex h-full flex-col gap-8 md:flex-row overflow-y-scroll">
			<TeamCard teamPlayerData={personalTeam} {displayName} {matchups} />
			<TeamCard teamPlayerData={opponentTeam} {displayName} {matchups} />
		</div>
	</div>
{/snippet}

{#snippet boostsCard()}
	<div class="grid grid-rows-[min-content_auto] w-full gap-4 md:flex-1 items-start">
		<h3 class="text-secondary text-fluid-lg mb-2 w-full whitespace-nowrap self-center">
			Your Score Modifiers
		</h3>
		<BoostsCard boosts={userBoosts} />
	</div>
{/snippet}

<BoostSelectionDialog weekBoosted={userBoosts} {personalTeam} {matchups}></BoostSelectionDialog>

<WeekShell>
	{#snippet copy()}
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	{/snippet}
	{@render secondaryNavAndPanels()}
</WeekShell>
