<script lang="ts">
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import PageShell from '$lib/components/shared/PageShell.svelte';

	let { matchups, teamData, userTeamAssignment, currentWeekText, displayName, weekJoined } =
		$props();
</script>

<div class="md:h-[calc(100vh-4rem)]">
	<PageShell>
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
		<hr class="h-[1px] w-full border-0 border-t-2 border-t-black md:hidden" />
		<div class="flex flex-col gap-4 overflow-y-scroll md:my-auto md:w-full md:gap-8">
			<h2 class="text-secondary text-2xl">Teams for {currentWeekText}</h2>
			<div class="flex flex-col gap-16 md:flex-row">
				<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
				<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
			</div>
		</div>
	</PageShell>
</div>
