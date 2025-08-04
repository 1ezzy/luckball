<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';

	const isDesktop = new MediaQuery('(min-width: 1024px)');
	const isTablet = new MediaQuery('(min-width: 768px) and (max-width: 1023px)');

	let { matchups, teams, matchupDates, seasonPrefix, currentWeek } = $props();
</script>

{#if isDesktop.current}
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {seasonPrefix} Week {currentWeek}</h2>
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
							<span class="text-center text-sm">{matchup}</span>
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
{:else if isTablet.current}
	<div class="flex flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {seasonPrefix} Week {currentWeek}</h2>
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
							<span class="text-center text-sm">{matchup}</span>
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
{:else}
	<div class="flex flex-col gap-4 text-center">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {seasonPrefix} Week {currentWeek}</h2>
		<Card class="h-full p-4">
			{#each matchups as matchup, i}
				<div class="flex w-full flex-col items-center justify-center gap-1">
					<div class="flex w-full flex-row items-center justify-center gap-4 px-2">
						<img
							class="h-6"
							height="32"
							src="{PUBLIC_TEAM_LOGO_URL}/{teams[i * 2]}.png"
							alt="{teams[i * 2]} logo"
						/>
						<span class="text-center text-sm">{matchup}</span>
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
		</Card>
	</div>
{/if}
