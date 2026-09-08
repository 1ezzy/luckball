<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { Card } from 'svelte-ux';

	let { boosts } = $props();
	let luckyPicks = $state(true);
</script>

{#snippet boostPill(multiplierAmt: number, teamName: string)}
	<div
		class="flex flex-row gap-2 items-center text-fluid-xs rounded-full bg-primary-300 px-2 py-1 border-2 border-primary-500"
	>
		<span>{multiplierAmt.toPrecision(3)}x</span>
		<span class="font-extrabold">{teamName}</span>
		<img
			class="h-4"
			height="16"
			src="{PUBLIC_TEAM_LOGO_URL}/{teamName}.png"
			alt="{teamName} logo"
		/>
	</div>
{/snippet}

<Card class="bg-surface-200 h-fit w-full rounded-lg border-2 p-4 grid gap-16 grid-cols-2">
	<div class="grid grid-rows-[1fr_auto] gap-2">
		<span class="text-fluid-sm">Baller Boosts</span>
		<div class="flex flex-row justify-start gap-4 justify-self-start">
			{@render boostPill(1.25, boosts.multiplier1Team)}
			{@render boostPill(1.5, boosts.multiplier2Team)}
			{@render boostPill(2.0, boosts.multiplier3Team)}
		</div>
	</div>
	{#if luckyPicks}
		<div class="grid grid-rows-[1fr_auto] gap-2">
			<span class="text-fluid-sm">Lucky Picks</span>
			<div class="flex flex-row justify-start gap-4 justify-self-start">
				{@render boostPill(1.25, boosts.multiplier1Team)}
				{@render boostPill(1.5, boosts.multiplier2Team)}
				{@render boostPill(2.0, boosts.multiplier3Team)}
			</div>
		</div>
	{/if}
</Card>
