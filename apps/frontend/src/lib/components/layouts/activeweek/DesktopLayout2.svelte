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

<div class="grid h-screen w-full flex-1 grid-cols-3 xl:mx-auto xl:max-w-[80vw] 2xl:max-w-[70vw]">
	<div class="col-span-2 flex flex-col items-center justify-center gap-16 px-16 py-24">
		<TitleAndActiveWeekCopy {seasonPrefix} {currentWeek} {weekJoined} {teamName} />
		<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	</div>
	<div class="col-span-1 flex flex-col gap-4 overflow-y-scroll py-24 pr-16">
		<h2 class="text-primary text-2xl">Teams</h2>
		<div class="flex flex-col gap-16">
			<TeamCard teamPlayerData={team1Data} {displayName} />
			<TeamCard teamPlayerData={team2Data} {displayName} />
		</div>
	</div>
</div>
