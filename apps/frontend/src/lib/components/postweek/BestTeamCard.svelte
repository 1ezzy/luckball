<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { Card } from 'svelte-ux';

	let { bestNflTeamName } = $props();

	const bestNflTeamScore = 0;
</script>

<Card class="flex h-full flex-1  flex-col items-center justify-center gap-16 p-8 text-center">
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Highest Scoring NFL Team</h2>
		<h2 class="text-secondary mb-2 text-2xl">{bestNflTeamName}</h2>
		<span class="text-sm">Total Points This Week: {bestNflTeamScore}</span>
	</div>
</Card>
