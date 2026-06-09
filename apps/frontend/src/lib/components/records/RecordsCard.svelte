<script lang="ts">
	import { Card } from 'svelte-ux';

	let { totalWins, totalLosses, highestScoringTeamName, highestScoringTeamScore } = $props();
</script>

<Card class="bg-surface-200 flex items-center justify-center border-2 p-8">
	<div class="flex flex-col gap-8 text-center 2xl:gap-16">
		<div class="flex flex-col gap-4">
			<h2 class="text-primary text-fluid-lg mb-2">Record (All-Time)</h2>
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
			<h2 class="text-primary text-fluid-lg mb-2">Other Stats</h2>
			<span class="text-fluid-base">
				Best Team:
				<span class="text-secondary font-bold">{highestScoringTeamName}</span>
				(<span class="text-accent font-bold">{highestScoringTeamScore}</span>)
			</span>
		</div>
	</div>
</Card>
