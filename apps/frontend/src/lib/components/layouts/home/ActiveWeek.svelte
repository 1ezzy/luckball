<script lang="ts">
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import PageShell from '$lib/components/shared/PageShell.svelte';

	let { matchups, teamData, userTeamAssignment, currentWeekText, displayName, weekJoined } =
		$props();

	const options = [
		{
			label: 'Matchups',
			value: 'matchups'
		},
		{
			label: 'Schedule',
			value: 'schedule'
		}
	];
	let value = $state('matchups');
</script>

<div class="hidden h-[calc(100vh-4rem)] lg:block">
	<PageShell>
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
		<div class="flex w-full flex-col gap-8 overflow-y-scroll">
			<h2 class="text-secondary text-2xl">Teams for {currentWeekText}</h2>
			<div class="flex flex-row gap-16">
				<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
				<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
			</div>
		</div>
	</PageShell>
</div>
<div class="hidden h-[calc(100vh-4rem)] md:block lg:hidden">
	<PageShell>
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
		<div class="flex w-full flex-col gap-8 overflow-y-scroll">
			<h2 class="text-secondary text-2xl">Teams for {currentWeekText}</h2>
			<div class="flex flex-row gap-16">
				<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
				<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
			</div>
		</div>
	</PageShell>
</div>
<div class="block md:hidden">
	<PageShell>
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<div class="flex flex-col gap-4 overflow-y-scroll">
			<h2 class="text-secondary text-2xl">Teams for {currentWeekText}</h2>
			<div class="flex flex-col gap-16">
				<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
				<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
			</div>
		</div>
	</PageShell>
</div>
