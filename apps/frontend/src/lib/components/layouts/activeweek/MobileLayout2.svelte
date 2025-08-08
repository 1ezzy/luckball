<script lang="ts">
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/TitleAndActiveWeekCopy.svelte';

	let {
		weekJoined,
		seasonPrefix,
		currentWeek,
		displayName,
		userData,
		userId,
		matchups,
		teams,
		matchupDates,
		weekData
	} = $props();

	let team1Data = $derived({
		...weekData.team1,
		usernames: weekData.team1.players.map((id: string) => userData[id]?.displayName).filter(Boolean)
	});
	let team2Data = $derived({
		...weekData.team2,
		usernames: weekData.team2.players.map((id: string) => userData[id]?.displayName).filter(Boolean)
	});

	let teamName = $state('');
	$effect(() => {
		if (team1Data.players.includes(userId)) {
			teamName = weekData.team1.name;
		} else if (team2Data.players.includes(userId)) {
			teamName = weekData.team2.name;
		}
	});
</script>

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndActiveWeekCopy {seasonPrefix} {currentWeek} {weekJoined} {teamName} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<div class="flex flex-col gap-4 overflow-y-scroll">
		<h2 class="text-primary text-2xl">Teams</h2>
		<div class="flex flex-col gap-16">
			<TeamCard teamPlayerData={team1Data} {displayName} />
			<TeamCard teamPlayerData={team2Data} {displayName} />
		</div>
	</div>
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
</div>
