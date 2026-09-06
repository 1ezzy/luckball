<script lang="ts">
	import BoostSelectionDialog from '$lib/components/home/activeweek/BoostSelectionDialog.svelte';
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';
	import type { Team } from '@luckball/game-logic/types';

	let {
		matchups,
		teamData,
		userTeamAssignment,
		currentWeekText,
		displayName,
		weekJoined,
		weekBoosted
	} = $props();

	let personalTeam = $derived(
		teamData?.filter((team: Team) => team.name === userTeamAssignment)[0]
	);
	let opponentTeam = $derived(
		teamData?.filter((team: Team) => team.name !== userTeamAssignment)[0]
	);
</script>

<BoostSelectionDialog {weekBoosted} {personalTeam} {matchups}></BoostSelectionDialog>

<WeekShell>
	{#snippet copy()}
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	{/snippet}
	<div class="flex h-full flex-col gap-8 overflow-y-scroll md:flex-row">
		<TeamCard teamPlayerData={personalTeam} {displayName} {matchups} />
		<TeamCard teamPlayerData={opponentTeam} {displayName} {matchups} />
	</div>
</WeekShell>
