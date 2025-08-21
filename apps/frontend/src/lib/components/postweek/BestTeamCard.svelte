<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { Card } from 'svelte-ux';

	let { bestNflTeamName, bestNflTeamScore } = $props();
</script>

<Card class="flex h-full flex-1  flex-col items-center justify-center gap-16 p-8 text-center">
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Highest Scoring NFL Team</h2>
		<div class="flex flex-row items-center justify-center gap-2">
			<img
				class="h-8"
				height="32"
				src="{PUBLIC_TEAM_LOGO_URL}/{bestNflTeamName}.png"
				alt="{bestNflTeamName} logo"
			/>
			<h2 class="text-primary text-2xl">{bestNflTeamName}</h2>
		</div>
		<span class="text-sm">
			Total Points This Week:
			<span class="text-accent">{bestNflTeamScore}</span>
		</span>
	</div>
</Card>
