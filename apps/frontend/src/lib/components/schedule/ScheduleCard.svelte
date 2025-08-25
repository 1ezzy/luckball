<script lang="ts">
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import type { MatchupData } from '$lib/types/valkey-types';

	let { matchups, currentWeekText, showScores = false } = $props();

	const getTeamScoreFromMatchup = (matchup: MatchupData, index: number) => {
		if (!matchup.matchupScores) return undefined;
		return matchup.matchupScores?.find((obj) => obj[matchup.teams[index]] !== undefined)?.[
			matchup.teams[index]
		];
	};
</script>

{#snippet team1LogoScore(matchup: MatchupData)}
	<div class="flex h-10 flex-col items-start justify-between gap-1">
		<img
			class="h-6"
			height="32"
			src="{PUBLIC_TEAM_LOGO_URL}/{matchup.teams[0]}.png"
			alt="{matchup.teams[0]} logo"
		/>
		{#if showScores}
			<span class="text-primary text-xs font-bold">
				{getTeamScoreFromMatchup(matchup, 0)}
			</span>
		{/if}
	</div>
{/snippet}

{#snippet team2LogoScore(matchup: MatchupData)}
	<div class="flex h-10 flex-col items-end justify-between gap-1">
		<img
			class="h-6"
			height="32"
			src="{PUBLIC_TEAM_LOGO_URL}/{matchup.teams[1]}.png"
			alt="{matchup.teams[1]} logo"
		/>
		{#if showScores}
			<span class="text-primary text-xs font-bold">{getTeamScoreFromMatchup(matchup, 1)}</span>
		{/if}
	</div>
{/snippet}

{#snippet matchupAndDate(matchup: MatchupData)}
	<div class="flex h-10 flex-col justify-between">
		<span class="text-center text-sm">{matchup.event}</span>
		<span class="text-center text-xs opacity-50">
			{new Date(matchup.date).toLocaleString('en-us', {
				weekday: 'short',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			})}
		</span>
	</div>
{/snippet}

<div class="my-auto hidden w-full lg:block">
	<div class="flex h-full w-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {currentWeekText}</h2>
		<Card class="h-full">
			<div
				class="grid h-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-center justify-items-center gap-8 p-4"
			>
				{#each matchups as matchup}
					<div class="flex w-full flex-row items-stretch justify-between gap-1">
						{@render team1LogoScore(matchup)}
						{@render matchupAndDate(matchup)}
						{@render team2LogoScore(matchup)}
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>
<div class="my-auto hidden w-full md:block lg:hidden">
	<div class="flex h-full w-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">Schedule for {currentWeekText}</h2>
		<Card class="h-full">
			<div
				class="grid h-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] grid-rows-4 items-center justify-items-center gap-8 p-4"
			>
				{#each matchups as matchup}
					<div class="flex w-full flex-row items-stretch justify-between gap-1">
						{@render team1LogoScore(matchup)}
						{@render matchupAndDate(matchup)}
						{@render team2LogoScore(matchup)}
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
			<div class="flex w-full flex-col items-center justify-center gap-4">
				{#each matchups as matchup}
					<div class="flex w-full flex-row items-center justify-center gap-4">
						{@render team1LogoScore(matchup)}
						{@render matchupAndDate(matchup)}
						{@render team2LogoScore(matchup)}
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>
