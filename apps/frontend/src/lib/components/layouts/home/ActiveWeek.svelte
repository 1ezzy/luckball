<script lang="ts">
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';

	let { matchups, teamData, userTeamAssignment, currentWeekText, displayName, weekJoined } =
		$props();
</script>

<WeekShell>
	{#snippet copy()}
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	{/snippet}
	<h2 class="text-secondary text-fluid-xl">Teams for {currentWeekText}</h2>
	<div class="flex h-full flex-col gap-8 overflow-y-scroll md:flex-row">
		<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
		<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
	</div>
</WeekShell>
