<script lang="ts">
	import { Card } from 'svelte-ux';
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import TeamCardColumn from '$lib/components/home/activeweek/TeamCardColumn.svelte';
	import type { Matchup } from '@luckball/game-logic/types';
	import { LucideChevronDown } from '@lucide/svelte';

	let { teamPlayerData, displayName, matchups } = $props();

	export function getTeamScoreFromMatchups(matchups: Matchup[], team: string): number | undefined {
		if (!matchups) return undefined;
		const matchup = matchups.find((m) => m.teams.includes(team));
		if (!matchup?.matchupScores) return undefined;
		return matchup.matchupScores.find((obj) => obj[team] !== undefined)?.[team];
	}

	let expandedTeams = $state(new Set<string>());
	let toggleTeam = (team: string) => {
		const next = new Set(expandedTeams);
		if (next.has(team)) next.delete(team);
		else next.add(team);
		expandedTeams = next;
	};
</script>

{#snippet playersColumn(data: any)}
	{#each data?.usernames as player}
		<div
			class="col-span-1 flex flex-row items-center justify-between gap-2 overflow-auto truncate px-2"
		>
			<span class="truncate" class:text-primary={player === displayName}>
				{player}
			</span>
		</div>
	{/each}
{/snippet}

{#snippet teamsColumn(data: any)}
	<div
		class="grid grid-cols-[min-content_2fr_fit-content(50%)_3fr_fit-content(25%)] items-center gap-2"
	>
		{#each data?.nflTeams as nflTeam}
			{const matchup = matchups?.find((matchup: any) => matchup.teams.includes(nflTeam))}
			{const opponent = matchup?.teams.find((team: any) => team !== nflTeam)}
			{const score = getTeamScoreFromMatchups(matchups, nflTeam)}

			<div class="contents cursor-pointer" onclick={() => toggleTeam(nflTeam)} role="presentation">
				<LucideChevronDown
					class={[
						'w-fit transition-transform duration-300',
						expandedTeams.has(nflTeam) ? '-rotate-90' : ''
					]}
					size={16}
				/>
				<img
					class="h-6 w-fit"
					height="32"
					src="{PUBLIC_TEAM_LOGO_URL}/{nflTeam}.png"
					alt="{nflTeam} logo"
				/>
				<span class="text-fluid-sm justify-self-end">{nflTeam}</span>
				<span class="text-fluid-xs text-primary-content/40 self-end mb-0.5 whitespace-nowrap"
					>vs {opponent}</span
				>
				<span class="text-accent text-fluid-sm grid w-full grid-cols-2 items-end gap-1">
					<span>{score}</span>
					<span class="text-primary-content text-fluid-xs mb-0.5 justify-self-end">pts</span>
				</span>
			</div>

			<div
				class={[
					'col-span-full grid transition-[grid-template-rows] duration-300',
					expandedTeams.has(nflTeam) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				]}
			>
				<div
					class="text-fluid-xs text-primary-content/60 ml-8 flex flex-row items-center overflow-hidden"
				>
					<span class="p-2">More details coming soon...</span>
				</div>
			</div>
		{/each}
	</div>
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
