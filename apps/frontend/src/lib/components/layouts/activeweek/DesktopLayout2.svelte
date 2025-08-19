<script lang="ts">
	import ScheduleCard from '$lib/components/shared/ScheduleCard.svelte';
	import TeamCard from '$lib/components/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/activeweek/TitleAndActiveWeekCopy.svelte';
	import { Tabs } from 'svelte-ux';

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

<div
	class="flex h-screen w-full flex-1 flex-col justify-center gap-8 xl:mx-auto xl:max-w-[90vw] 2xl:max-w-[70vw]"
>
	<div class="flex flex-col items-start justify-center gap-8 px-16 pt-20">
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	</div>
	<div class="flex flex-col justify-start overflow-hidden px-16 pb-20">
		<Tabs
			{options}
			placement="top"
			bind:value
			classes={{
				tabs: 'gap-2 min-h-8',
				content: 'rounded-b rounded-tr h-full overflow-y-auto',
				tab: { root: 'rounded-t' }
			}}
		>
			<svelte:fragment slot="content" let:value>
				<div class="flex flex-col items-start justify-center gap-8 pt-8">
					{#if value === 'schedule'}
						<div class="flex h-full w-full flex-col gap-4 pr-4">
							<ScheduleCard showScores={true} {matchups} {currentWeekText} />
						</div>
					{:else if value === 'matchups'}
						<div class="flex h-full w-full flex-col gap-4 pr-4">
							<h2 class="text-secondary text-2xl">
								Teams for {currentWeekText}
							</h2>
							<div class="flex w-full flex-row gap-8">
								<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
								<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
							</div>
						</div>
					{/if}
				</div>
			</svelte:fragment>
		</Tabs>
	</div>
</div>
