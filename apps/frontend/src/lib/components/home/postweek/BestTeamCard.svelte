<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { Card } from 'svelte-ux';

	let { bestNflTeamName, bestNflTeamScore } = $props();
</script>

<Card
	class="bg-surface-200 h-9/10 grid flex-1 grid-rows-2 items-center justify-center rounded-lg border-2 p-8 text-center md:my-auto 2xl:max-h-[40vh]"
>
	<h2 class="text-secondary text-fluid-lg mb-2">Highest Scoring NFL Team</h2>
	<div class="flex flex-col gap-2">
		<div class="flex flex-row items-center justify-center gap-2">
			<img
				class="h-6"
				height="32"
				src="{PUBLIC_TEAM_LOGO_URL}/{bestNflTeamName}.png"
				alt="{bestNflTeamName} logo"
			/>
			<h2 class="text-primary text-fluid-base">{bestNflTeamName}</h2>
		</div>
		<span class="text-fluid-base">
			Team Score:
			<span class="text-accent">{bestNflTeamScore}</span>
		</span>
	</div>
</Card>
