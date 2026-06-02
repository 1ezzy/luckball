<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import type { MatchupData } from '$lib/types/valkey-types';
	import { Card } from 'svelte-ux';

	let { teamPlayerData, displayName, matchups } = $props();

	export function getTeamScoreFromMatchups(
		matchups: MatchupData[],
		team: string
	): number | undefined {
		if (!matchups) return undefined;
		const matchup = matchups.find((m) => m.teams.includes(team));
		if (!matchup?.matchupScores) return undefined;
		return matchup.matchupScores.find((obj) => obj[team] !== undefined)?.[team];
	}
</script>

{#snippet playersText(data: any)}
	<div class="flex w-full flex-col gap-1">
		<h3 class="text-accent">Players</h3>
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<div class="grid grid-cols-1 gap-2 md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
			{#each data?.usernames as player}
				<div class="col-span-1 flex flex-row items-center justify-between gap-2 overflow-auto truncate p-2">
					<span class="truncate" class:text-primary={player === displayName}>
						{player}
					</span>
				</div>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet teamsText(data: any)}
	<div class="flex w-full flex-col gap-1">
		<h3 class="text-accent">Teams</h3>
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<div class="grid grid-cols-1 gap-2 md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
			{#each data?.nflTeams as team}
				<div class="w-30 flex flex-row items-center justify-between p-2">
					<img class="h-6" height="32" src="{PUBLIC_TEAM_LOGO_URL}/{team}.png" alt="{team} logo" />
					<span>{team}</span>
					<span class="text-primary text-xs">({getTeamScoreFromMatchups(matchups, team)})</span>
				</div>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet titleAndCard(data: any)}
	<div class="flex h-full flex-col gap-4">
		<h2 class="text-primary mb-2 text-2xl">
			{data?.name}<span class="ml-2"> - {data.totalScore} points</span>
		</h2>
		<Card class="flex h-full flex-row justify-start gap-4 p-4">
			{@render teamsText(data)}
			{@render playersText(data)}
		</Card>
	</div>
{/snippet}

<div class="w-full md:flex-1">
	{@render titleAndCard(teamPlayerData)}
</div>
