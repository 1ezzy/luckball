<script lang="ts">
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/TitleAndActiveWeekCopy.svelte';

	let {
		matchups,
		matchupDates,
		teams,
		team1Data,
		team2Data,
		teamName,
		seasonPrefix,
		currentWeek,
		displayName,
		weekJoined
	} = $props();
</script>

<div class="grid h-screen w-full flex-1 grid-cols-12">
	<div class="col-span-7 flex flex-col items-center justify-center gap-16 py-16 pl-12">
		<TitleAndActiveWeekCopy {seasonPrefix} {currentWeek} {weekJoined} {teamName} />
		<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	</div>
	<div class="w-[1px] grid-cols-1 justify-self-center bg-white"></div>
	<div class="col-span-4 flex flex-col gap-4 overflow-y-scroll py-16 pr-12">
		<h2 class="text-primary text-2xl">Teams</h2>
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<div class="flex flex-1 flex-col gap-16 overflow-y-scroll pr-4">
			<TeamCard teamPlayerData={team1Data} {displayName} />
			<TeamCard teamPlayerData={team2Data} {displayName} />
		</div>
	</div>
</div>
