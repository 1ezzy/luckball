<script lang="ts">
	import { ToggleGroup, ToggleOption, TogglePanel } from 'svelte-ux';
	import BoostsCard from '$lib/components/home/activeweek/BoostsCard.svelte';
	import BoostSelectionDialog from '$lib/components/home/activeweek/BoostSelectionDialog.svelte';
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';
	import { ArrowBigUpDash, ChessQueen } from '@lucide/svelte';
	import type { Matchup, Team } from '@luckball/game-logic/types';

	let {
		matchups,
		teamData,
		userTeamAssignment,
		currentWeekText,
		displayName,
		weekJoined,
		userBoosts
	} = $props();

	let personalTeam: Team = $derived(
		teamData?.filter((team: Team) => team.name === userTeamAssignment)[0]
	);
	let opponentTeam: Team = $derived(
		teamData?.filter((team: Team) => team.name !== userTeamAssignment)[0]
	);
</script>

{#snippet secondaryNavAndPanels()}
	<ToggleGroup
		value="teams"
		variant="default"
		size="lg"
		inset
		vertical
		classes={{
			root: 'grid grid-rows-[min-content_auto] gap-12 2xl:gap-16 md:grid-rows-none md:grid-cols-[min-content_auto] md:h-full',
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
	<div class="grid grid-rows-[min-content_auto] w-full gap-1 h-full min-h-0">
		<h3 class="text-secondary text-fluid-lg mb-2 w-full whitespace-nowrap">This Week's Lineups</h3>

		<!-- layout for desktop view -->
		<div class="hidden md:flex h-full min-h-0 gap-8 flex-row">
			{@render teamCardWithTitle(personalTeam, matchups, displayName)}
			{@render teamCardWithTitle(opponentTeam, matchups)}
		</div>

		<!-- layout for mobile view -->
		<div class="md:hidden snap-x snap-mandatory flex flex-row gap-8 overflow-x-scroll">
			{@render teamCardWithTitle(personalTeam, matchups, displayName)}
			{@render teamCardWithTitle(opponentTeam, matchups)}
		</div>
	</div>
{/snippet}

{#snippet teamCardWithTitle(teamData: Team, matchups: Matchup[], displayName?: string)}
	<div class="flex w-full flex-col gap-4 md:h-full md:min-h-0 md:flex-1 snap-center">
		<h2 class="text-primary text-fluid-lg mb-2 flex flex-row gap-4">
			<span>{teamData?.name}</span>
			<span class="text-primary-content">|</span>
			<div>
				<span class="text-accent">{teamData?.totalScore}</span>
				<span class="text-primary-content"> points</span>
			</div>
		</h2>
		<span class="pr-4 md:min-h-0 md:flex-1 md:overflow-y-auto">
			<TeamCard {teamData} {matchups} {displayName} />
		</span>
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
