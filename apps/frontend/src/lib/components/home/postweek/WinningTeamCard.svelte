<script lang="ts">
	import { Card } from 'svelte-ux';

	let { winningTeamName, winningTeamScore } = $props();
</script>

<Card
	class="bg-surface-200 h-9/10 flex flex-1 flex-col items-center justify-start gap-16 rounded-lg border-2 p-8 text-center"
>
	<div class="flex h-full flex-col gap-4">
		<h2 class="text-primary text-fluid-lg mb-2">Winning Luckball Team</h2>
		<div class="my-auto flex flex-col gap-2">
			<h2 class="text-secondary text-fluid-base mb-2">{winningTeamName}</h2>
			<span class="text-fluid-base">
				Total Score:
				<span class="text-accent">{winningTeamScore}</span>
			</span>
		</div>
	</div>
</Card>
