<script lang="ts">
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import TeamCardColumn from '$lib/components/home/activeweek/TeamCardColumn.svelte';
	import type { MatchupData } from '$lib/types/valkey-types';

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

{#snippet playersColumn(data: any)}
	{#each data?.usernames as player}
		<div
			class="col-span-1 flex flex-row items-center justify-between gap-2 overflow-auto truncate p-2"
		>
			<span class="truncate" class:text-primary={player === displayName}>
				{player}
			</span>
		</div>
	{/each}
{/snippet}

{#snippet teamsColumn(data: any)}
	{#each data?.nflTeams as team}
		<div class="w-30 flex flex-row items-center justify-between p-2">
			<img class="h-6" height="32" src="{PUBLIC_TEAM_LOGO_URL}/{team}.png" alt="{team} logo" />
			<span>{team}</span>
			<span class="text-primary text-fluid-xs">({getTeamScoreFromMatchups(matchups, team)})</span>
		</div>
	{/each}
{/snippet}

<div class="w-full md:flex-1">
	<div class="flex h-full flex-col gap-4">
		<h2 class="text-primary text-fluid-lg mb-2 flex flex-row gap-4">
			<span>{teamPlayerData?.name}</span>
			<span>|</span>
			<span>{teamPlayerData.totalScore} points</span>
		</h2>
		<Card class="bg-surface-200 flex h-full flex-row justify-start gap-8 rounded-lg border-2 p-4">
			<TeamCardColumn header="Teams">
				{@render teamsColumn(teamPlayerData)}
			</TeamCardColumn>
			<TeamCardColumn header="Players">
				{@render playersColumn(teamPlayerData)}
			</TeamCardColumn>
		</Card>
	</div>
</div>
