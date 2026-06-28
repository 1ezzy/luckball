<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import type { Team } from '@luckball/game-logic';
	import { Button, Card, Dialog, SelectField } from 'svelte-ux';

	let { weekBoosted, personalTeam, opponentTeam } = $props();
	let boostCopy =
		'Choose three teams to boost. Each boost has a different multiplier, pick wisely!';

	let selections = $state<(string | null)[]>([null, null, null]);
	let getOptionsForIndex = (index: number) => {
		const otherSelections = selections.filter((_, i) => i !== index);
		return personalTeam.nflTeams
			.filter((team: string) => !otherSelections.includes(team))
			.map((team: string) => ({ label: team, value: team }));
	};
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
	<div class="grid grid-cols-3 gap-16 items-center h-full p-8">
		{#each ['1.25x Boost', '1.50x Boost', '2.00x Boost'] as title, index}
			{@render dialogCard(title, index)}
		{/each}
	</div>
{/snippet}

{#snippet dialogCard(title: string, index: number)}
	<Card class="h-full pb-4 bg-surface-200 gap-2 overflow-hidden" {title}>
		<div slot="contents" class="h-full flex flex-col">
			<SelectField
				classes={{ options: 'text-primary-content' }}
				label="Select Team"
				options={getOptionsForIndex(index)}
			/>
			<div class="flex-1 my-auto flex flex-col gap-4 items-center justify-center">
				<span class="text-fluid-base text-secondary">Selected Team:</span>
				<img class="h-12" height="48" src="{PUBLIC_TEAM_LOGO_URL}/CIN.png" alt="CIN logo" />
			</div>
		</div>
	</Card>
{/snippet}

{#snippet dialogActions()}
	<div class="w-full flex justify-end px-8">
		<Button class="text-white" variant="fill" color="primary" disabled={true}>Continue</Button>
	</div>
{/snippet}

{#if weekBoosted === null || weekBoosted === undefined}
	<Dialog
		class="bg-surface-300 text-primary-content h-[75vh] w-[75vw] border-2 border-primary-content rounded-lg"
		open={true}
		persistent
	>
		<div class="grid w-full h-full p-8 grid-rows-[min-content_auto_min-content] gap-4">
			{@render dialogHeader()}
			{@render dialogCards()}
			{@render dialogActions()}
		</div>
	</Dialog>
{/if}
