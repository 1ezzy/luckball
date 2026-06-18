<script lang="ts">
	import { Card } from 'svelte-ux';

	let { winningTeamName, winningTeamScore } = $props();
</script>

<Card
	class="bg-surface-200 h-9/10 grid flex-1 grid-rows-2 items-center justify-center rounded-lg border-2 p-8 text-center md:my-auto 2xl:max-h-[40vh]"
>
	<h2 class="text-secondary text-fluid-lg mb-2">Winning Luckball Team</h2>
	<div class="flex flex-col gap-2">
		<h2 class="text-primary text-fluid-base mb-2">{winningTeamName}</h2>
		<span class="text-fluid-base">
			Total Score:
			<span class="text-accent">{winningTeamScore}</span>
		</span>
	</div>
</Card>
