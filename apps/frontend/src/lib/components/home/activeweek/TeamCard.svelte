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
		{@const matchup = matchups?.find((m: any) => m.teams.includes(team))}
		{@const opponent = matchup?.teams.find((t: any) => t !== team)}
		<div class="flex flex-row items-center p-2">
			<div class="w-5/10 flex flex-row gap-2">
				<img class="h-6" height="32" src="{PUBLIC_TEAM_LOGO_URL}/{team}.png" alt="{team} logo" />
				<div class="flex h-fit flex-row items-end gap-1">
					<span class="text-fluid-sm">{team}</span>
					<span class="text-fluid-xs text-primary-content/40 mb-0.5">vs {opponent}</span>
				</div>
			</div>
			<span
				class="text-accent text-fluid-sm w-4/10 my-auto grid grid-cols-[24px_auto] items-end justify-end"
			>
				<span>{getTeamScoreFromMatchups(matchups, team)}</span>
				<span class="text-primary-content text-fluid-xs mb-0.5 justify-self-start">points</span>
			</span>
		</div>
	{/each}
{/snippet}

<div class="flex w-full flex-col gap-4 overflow-y-scroll md:flex-1">
	<h2 class="text-primary text-fluid-lg mb-2 flex flex-row gap-4">
		<span>{teamPlayerData?.name}</span>
		<span class="text-primary-content">|</span>
		<div>
			<span class="text-accent">{teamPlayerData.totalScore}</span>
			<span class="text-primary-content"> points</span>
		</div>
	</h2>
	<span class="overflow-y-scroll pr-4">
		<Card class="bg-surface-200 flex h-fit flex-row justify-start gap-8 rounded-lg border-2 p-4">
			<TeamCardColumn header="Teams">
				{@render teamsColumn(teamPlayerData)}
			</TeamCardColumn>
			<TeamCardColumn header="Players">
				{@render playersColumn(teamPlayerData)}
			</TeamCardColumn>
		</Card>
	</span>
</div>
