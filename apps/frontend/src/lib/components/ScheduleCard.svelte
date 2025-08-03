<script lang="ts">
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';

	let { matchups, teams, matchupDates } = $props();
</script>

<div class="flex max-w-2xl flex-col gap-4">
	<h2 class="text-secondary mb-2 text-2xl">Schedule for Preaseaon Week [weeknumber]</h2>
	<Card class="h-full">
		<div class="grid h-full grid-cols-4 grid-rows-4 items-center justify-items-center gap-2 p-4">
			{#each matchups as matchup, i}
				<div class="flex w-full flex-col gap-1">
					<div class="flex w-full flex-row items-center justify-between gap-2 px-2">
						<img
							class="h-6"
							height="32"
							src="{PUBLIC_TEAM_LOGO_URL}/{teams[i * 2]}.png"
							alt="{teams[i * 2]} logo"
						/>
						<span class="text-sm">{matchup}</span>
						<img
							class="h-6"
							src="{PUBLIC_TEAM_LOGO_URL}/{teams[i * 2 + 1]}.png"
							alt="{teams[i * 2 + 1]} logo"
						/>
					</div>
					<span class="text-center text-xs opacity-50">
						{new Date(matchupDates[i]).toLocaleString('en-us', {
							weekday: 'short',
							month: 'numeric',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
							hour12: true
						})}
					</span>
				</div>
			{/each}
		</div>
	</Card>
</div>
