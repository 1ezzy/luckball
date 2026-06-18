<script lang="ts">
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import type { MatchupData } from '$lib/types/valkey-types';

	let { matchups, showScores = true } = $props();

	const getTeamScoreFromMatchup = (matchup: MatchupData, index: number) => {
		if (!matchup.matchupScores) return undefined;
		return matchup.matchupScores?.find((obj) => obj[matchup.teams[index]] !== undefined)?.[
			matchup.teams[index]
		];
	};
</script>

{#snippet team1LogoScore(matchup: MatchupData)}
	<div class="grid grid-rows-2 items-center justify-items-center">
		<img
			class="h-8"
			height="32"
			src="{PUBLIC_TEAM_LOGO_URL}/{matchup.teams[0]}.png"
			alt="{matchup.teams[0]} logo"
		/>
		{#if showScores}
			<span class="text-accent text-xs font-bold">
				{getTeamScoreFromMatchup(matchup, 0)}
			</span>
		{/if}
	</div>
{/snippet}

{#snippet team2LogoScore(matchup: MatchupData)}
	<div class="grid grid-rows-2 items-center justify-items-center">
		<img
			class="h-8"
			height="32"
			src="{PUBLIC_TEAM_LOGO_URL}/{matchup.teams[1]}.png"
			alt="{matchup.teams[1]} logo"
		/>
		{#if showScores}
			<span class="text-accent text-xs font-bold">{getTeamScoreFromMatchup(matchup, 1)}</span>
		{/if}
	</div>
{/snippet}

<!--TODO: split up matchup.event so the opposing team name can be made lighter -->
{#snippet matchupAndDate(matchup: MatchupData)}
	{@const matchupSplit = matchup.event.split('@')}
	<div class="grid grid-rows-2 items-center justify-items-center">
		<div class="text-fluid-sm flex h-8 flex-row items-center gap-2">
			<span class="text-fluid-sm">{matchupSplit[0]}</span>
			<span>@</span>
			<span class="">{matchupSplit[1]}</span>
		</div>
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

<Card class="bg-surface-200 h-full w-full gap-4 rounded-lg border-2 p-4 md:max-h-[60vh]">
	<div
		class={[
			'my-auto flex w-full flex-col items-center justify-center gap-4',
			'md:grid md:grid-cols-2 md:grid-rows-8 md:justify-items-center md:gap-8 md:p-8 lg:grid-cols-4 lg:grid-rows-4'
		]}
	>
		{#each matchups as matchup}
			<div class="grid max-w-80 grid-cols-3 items-center justify-items-center gap-2">
				{@render team1LogoScore(matchup)}
				{@render matchupAndDate(matchup)}
				{@render team2LogoScore(matchup)}
			</div>
		{/each}
	</div>
</Card>
