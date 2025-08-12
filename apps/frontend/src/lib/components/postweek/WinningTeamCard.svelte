<script lang="ts">
	import { Card } from 'svelte-ux';

	let { winningTeamName } = $props();

	const winningTeamScore = 0;
</script>

<Card class="flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 text-center">
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Winning Team</h2>
		<h2 class="text-primary mb-2 text-2xl">{winningTeamName}</h2>
		<span class="text-sm">Total Points This Week: {winningTeamScore}</span>
	</div>
</Card>
