<script lang="ts">
	import { Card } from 'svelte-ux';

	let { totalWins, totalLosses, highestScoringTeamName, highestScoringTeamScore } = $props();
</script>

<Card class="!page-card grid-rows-2">
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary text-fluid-lg">Record (All-Time)</h2>
		<span class="text-fluid-base">
			<span class="text-accent font-bold">{totalWins}</span>
			wins
		</span>
		<span class="text-fluid-base">
			<span class="text-accent font-bold">{totalLosses}</span>
			losses
		</span>
	</div>
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary text-fluid-lg">Best Team (All-Time)</h2>
		<span class="text-fluid-base">
			<span class="text-primary font-bold">{highestScoringTeamName}</span>
			(<span class="text-accent font-bold">{highestScoringTeamScore}</span>)
		</span>
	</div>
</Card>
