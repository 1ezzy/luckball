<script lang="ts">
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/TitleAndActiveWeekCopy.svelte';
	import { Tabs } from 'svelte-ux';

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
		<TitleAndActiveWeekCopy {seasonPrefix} {currentWeek} {weekJoined} {teamName} />
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
							<ScheduleCard {matchups} {teams} {matchupDates} {seasonPrefix} {currentWeek} />
						</div>
					{:else if value === 'matchups'}
						<div class="flex h-full w-full flex-col gap-4 pr-4">
							<h2 class="text-secondary text-2xl">
								Teams for {seasonPrefix} Week {currentWeek}
							</h2>
							<div class="flex w-full flex-row gap-8">
								<TeamCard teamPlayerData={team1Data} {displayName} />
								<TeamCard teamPlayerData={team2Data} {displayName} />
							</div>
						</div>
					{/if}
				</div>
			</svelte:fragment>
		</Tabs>
	</div>
</div>
