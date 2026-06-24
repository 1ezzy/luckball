<script lang="ts">
	import { Card } from 'svelte-ux';

	let { winningTeamName, winningTeamScore } = $props();
</script>

<Card class="page-card! grid-rows-2">
	<h2 class="text-secondary text-fluid-lg mb-2">Winning Luckball Team</h2>
	<div class="flex flex-col gap-2">
		<h2 class="text-primary text-fluid-base mb-2">{winningTeamName}</h2>
		<span class="text-fluid-base">
			Total Score:
			<span class="text-accent">{winningTeamScore}</span>
		</span>
	</div>
</Card>
