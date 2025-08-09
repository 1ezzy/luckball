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

<div class="grid h-screen w-full flex-1 grid-cols-12 xl:mx-auto xl:max-w-[90vw] 2xl:max-w-[70vw]">
	<div class="col-span-7 flex flex-col items-start justify-center gap-8 py-20 pl-16">
		<TitleAndActiveWeekCopy {seasonPrefix} {currentWeek} {weekJoined} {teamName} />
		<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
	</div>
	<div class="w-[1px] grid-cols-1 justify-self-center bg-white"></div>
	<div class="col-span-4 flex flex-col gap-4 overflow-y-scroll py-20 pr-16">
		<h2 class="text-primary text-2xl">Teams</h2>
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<div class="flex flex-1 flex-col gap-16 overflow-y-scroll pr-4">
			<TeamCard teamPlayerData={team1Data} {displayName} />
			<TeamCard teamPlayerData={team2Data} {displayName} />
		</div>
	</div>
</div>
