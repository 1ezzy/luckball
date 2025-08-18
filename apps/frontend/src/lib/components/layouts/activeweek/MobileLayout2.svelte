<script lang="ts">
	import ScheduleCard from '$lib/components/shared/ScheduleCard.svelte';
	import TeamCard from '$lib/components/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/activeweek/TitleAndActiveWeekCopy.svelte';
	let { matchups, teamData, userTeamAssignment, currentWeekText, displayName, weekJoined } =
		$props();
</script>

<div class="flex w-full flex-1 flex-col gap-16 p-8">
	<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<div class="flex flex-col gap-4 overflow-y-scroll">
		<h2 class="text-secondary text-2xl">Teams for {currentWeekText}</h2>
		<div class="flex flex-col gap-16">
			<TeamCard teamPlayerData={teamData?.team1} {displayName} />
			<TeamCard teamPlayerData={teamData?.team2} {displayName} />
		</div>
	</div>
	<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
	<ScheduleCard {matchups} {currentWeekText} />
</div>
