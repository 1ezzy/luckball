<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { Card } from 'svelte-ux';

	let { bestNflTeamName, bestNflTeamScore } = $props();
</script>

<Card class="page-card! grid-rows-[min-content_auto]">
	<h2 class="text-secondary text-fluid-lg mb-2">Best NFL Team</h2>
	<div class="flex flex-col gap-4 md:gap-2">
		<div class="flex flex-row items-center justify-center gap-2">
			<img
				class="md:h-6 h-5"
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
