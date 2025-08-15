<script lang="ts">
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';

	let { matchups, matchupDates, matchupTeams, currentWeekText } = $props();
</script>

{#snippet matchupDiv(matchup: any, index: number)}
	<div class="flex flex-row items-center justify-between gap-4 px-2">
		<img
			class="h-6"
			height="32"
			src="{PUBLIC_TEAM_LOGO_URL}/{matchupTeams[index * 2]}.png"
			alt="{matchupTeams[index * 2]} logo"
		/>
		<span class="text-center text-sm">{matchup}</span>
		<img
			class="h-6"
			src="{PUBLIC_TEAM_LOGO_URL}/{matchupTeams[index * 2 + 1]}.png"
			alt="{matchupTeams[index * 2 + 1]} logo"
		/>
	</div>
{/snippet}

{#snippet date(index: number)}
	<span class="text-center text-xs opacity-50">
		{new Date(matchupDates[index]).toLocaleString('en-us', {
			weekday: 'short',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		})}
	</span>
{/snippet}

<div class="hidden w-full lg:block">
	<div class="flex h-full w-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {currentWeekText}</h2>
		<Card class="h-full">
			<div
				class="grid h-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-center justify-items-center gap-x-8 gap-y-4 p-4"
			>
				{#each matchups as matchup, i}
					<div class="flex w-full flex-col gap-1">
						{@render matchupDiv(matchup, i)}
						{@render date(i)}
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>
<div class="hidden w-full md:block lg:hidden">
	<div class="flex h-full w-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {currentWeekText}</h2>
		<Card class="h-full">
			<div
				class="grid h-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] grid-rows-4 items-center justify-items-center gap-8 p-4"
			>
				{#each matchups as matchup, i}
					<div class="flex w-full flex-col gap-1">
						{@render matchupDiv(matchup, i)}
						{@render date(i)}
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>
<div class="block w-full md:hidden">
	<div class="flex flex-col gap-4 text-center">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {currentWeekText}</h2>
		<Card class="h-full gap-4 p-4">
			{#each matchups as matchup, i}
				<div class="flex w-full flex-col items-center justify-center gap-1">
					{@render matchupDiv(matchup, i)}
					{@render date(i)}
				</div>
			{/each}
		</Card>
	</div>
</div>
