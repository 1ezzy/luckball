<script lang="ts">
	import { Card } from 'svelte-ux';

	let { totalWins, totalLosses, highestScoringTeamName, highestScoringTeamScore } = $props();
</script>

<Card
	class="bg-surface-200  flex h-full max-h-96 flex-auto items-center justify-center border-2 p-8"
>
	<div class="hidden lg:block">
		<div class="flex flex-col gap-8 text-center 2xl:gap-16">
			<div class="flex flex-col gap-4">
				<h2 class="text-primary mb-2 text-2xl">Record (All-Time)</h2>
				<span class="text-sm">
					<span class="text-accent">{totalWins}</span>
					wins
				</span>
				<span class="text-sm">
					<span class="text-accent">{totalLosses}</span>
					losses
				</span>
			</div>
			<div class="flex flex-col gap-4">
				<h2 class="text-primary mb-2 text-2xl">Other Stats</h2>
				<span class="text-sm">
					Your Best Team:
					<span class="text-secondary">{highestScoringTeamName}</span>
					(<span class="text-accent">{highestScoringTeamScore}</span>)
				</span>
			</div>
		</div>
	</div>
	<div class="hidden md:block lg:hidden">
		<div class="flex flex-col gap-8 text-center">
			<div class="flex flex-col gap-4">
				<h2 class="text-primary mb-2 text-2xl">Record (All-Time)</h2>
				<span class="text-sm">{totalWins} wins</span>
				<span class="text-sm">{totalLosses} losses</span>
			</div>
			<div class="flex flex-col gap-4">
				<h2 class="text-primary mb-2 text-2xl">Other Stats</h2>
				<span class="text-sm">
					Your Best Team: {highestScoringTeamName} ({highestScoringTeamScore})
				</span>
			</div>
		</div>
	</div>
	<div class="block md:hidden">
		<div class="flex flex-col gap-8 text-center">
			<div class="flex flex-col gap-4">
				<h2 class="text-primary mb-2 text-2xl">Record (All-Time)</h2>
				<span class="text-sm">{totalWins} wins</span>
				<span class="text-sm">{totalLosses} losses</span>
			</div>
			<div class="flex flex-col gap-4">
				<h2 class="text-primary mb-2 text-2xl">Other Stats</h2>
				<span class="text-sm">
					Your Best Team: {highestScoringTeamName} ({highestScoringTeamScore})
				</span>
			</div>
		</div>
	</div>
</Card>
