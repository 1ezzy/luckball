<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { NFL_TEAM_NAMES } from '@luckball/game-logic/client';
	import { Button, Card, Dialog, MenuItem, SelectField, type MenuOption } from 'svelte-ux';

	let { weekBoosted, personalTeam, matchups } = $props();
	let boostCopy =
		'Choose three teams to boost. Each boost has a different multiplier, pick wisely!';

	let mappedNflTeams = $derived(
		personalTeam.nflTeams.map((team: string) => ({ label: NFL_TEAM_NAMES[team], value: team }))
	);

	let selectedTeams = $state<(string | undefined)[]>([undefined, undefined, undefined]);
	let selectedTeamsOpponents = $derived<(string | undefined)[]>(
		selectedTeams.map((selectedTeam) => {
			return matchups
				?.find((matchup: any) => {
					return matchup.teams.includes(selectedTeam);
				})
				?.teams?.filter((team: string) => {
					return team !== selectedTeam;
				});
		})
	);
	let cardSelectFieldOptions = $derived<MenuOption[][]>(
		selectedTeams.map((_, i) => {
			return mappedNflTeams.map((formattedTeam: MenuOption) => {
				return {
					...formattedTeam,
					disabled:
						selectedTeams.filter((team, j) => {
							return team === formattedTeam.value && i !== j;
						}).length > 0
				};
			});
		})
	);

	let allBoostsSelected = $derived(!selectedTeams.some((team) => team === undefined));
</script>

{#snippet dialogHeader()}
	<div class="flex flex-col gap-4 h-fit">
		<div class="flex flex-row gap-4 items-center justify-center text-fluid-xl">
			<h3>Individual Score</h3>
			<span>|</span>
			<h4 class="text-primary">Baller Boosts</h4>
		</div>
		<div class="flex text-fluid-sm items-center justify-center">
			<span>{boostCopy}</span>
		</div>
	</div>
{/snippet}

{#snippet dialogCards()}
	<div class="grid grid-cols-3 gap-8 2xl:gap-16 items-center h-full p-8">
		{#each ['1.25x Boost', '1.50x Boost', '2.00x Boost'] as title, index}
			{@render dialogCard(title, index)}
		{/each}
	</div>
{/snippet}

{#snippet dialogCard(title: string, index: number)}
	{let selectedTeam = $derived(selectedTeams[index])}
	{let selectedTeamOpponent = $derived(selectedTeamsOpponents[index])}
	<Card class="h-full pb-4 bg-surface-200 gap-2 overflow-hidden" {title}>
		<div slot="contents" class="h-full flex flex-col">
			<SelectField
				classes={{ options: 'text-primary-content' }}
				label="Select Team"
				options={cardSelectFieldOptions[index]}
				bind:value={selectedTeams[index]}
			>
				<svelte:fragment slot="option" let:option let:index let:selected let:highlightIndex>
					<MenuItem
						class={[
							index === highlightIndex ? 'bg-surface-content/5' : '',
							option === selected ? 'font-semibold' : ''
						]}
						disabled={option.disabled}
						scrollIntoView={index === highlightIndex}
					>
						<div class="grid grid-cols-[1fr_auto] gap-2">
							<img
								class="h-4"
								height="48"
								src="{PUBLIC_TEAM_LOGO_URL}/{option.value}.png"
								alt="{option.value} logo"
							/>
							<span>{option.value}</span>
						</div>
					</MenuItem>
				</svelte:fragment>
			</SelectField>
			<div class="flex-1 my-auto flex flex-col gap-4 items-center justify-center">
				<span class="text-fluid-base text-secondary">Selected Team:</span>
				{#if selectedTeam}
					<div class="grid grid-rows-[1fr_auto]">
						<div class="grid grid-cols-2 items-center gap-2">
							<img
								class="h-12"
								height="48"
								src="{PUBLIC_TEAM_LOGO_URL}/{selectedTeam}.png"
								alt="{selectedTeam} logo"
							/>
							<span class="text-fluid-lg text-primary">{selectedTeam}</span>
						</div>
						<span class="text-fluid-sm text-primary-content/40 text-center">
							vs {selectedTeamOpponent}
						</span>
					</div>
				{:else}
					<span class="text-fluid-sm">No Team Selected</span>
				{/if}
			</div>
		</div>
	</Card>
{/snippet}

{#snippet dialogActions()}
	<form
		class="w-full flex justify-end px-8"
		method="POST"
		action="?/selectBoosts"
		use:enhance={({ formData }) => {
			formData.set('boostedTeams', JSON.stringify(selectedTeams));
		}}
	>
		<Button
			class="text-white"
			variant="fill"
			color="primary"
			type="submit"
			disabled={!allBoostsSelected}
		>
			Continue
		</Button>
	</form>
{/snippet}

{#if weekBoosted === null || weekBoosted === undefined}
	<Dialog
		class="PortalTarget bg-surface-300 text-primary-content h-[75vh] w-[75vw] border-2 border-primary-content rounded-lg"
		open={true}
		persistent
		portal={false}
	>
		<div class="grid w-full h-full p-8 grid-rows-[min-content_auto_min-content] gap-4">
			{@render dialogHeader()}
			{@render dialogCards()}
			{@render dialogActions()}
		</div>
	</Dialog>
{/if}
