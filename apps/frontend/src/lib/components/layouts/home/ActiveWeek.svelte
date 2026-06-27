<script lang="ts">
	import { Dialog } from 'svelte-ux';
	import TeamCard from '$lib/components/home/activeweek/TeamCard.svelte';
	import TitleAndActiveWeekCopy from '$lib/components/home/activeweek/TitleAndActiveWeekCopy.svelte';
	import WeekShell from '$lib/components/layouts/home/WeekShell.svelte';

	let {
		matchups,
		teamData,
		userTeamAssignment,
		currentWeekText,
		displayName,
		weekJoined,
		weekBoosted
	} = $props();

	// TODO: add logic to detect if user has already boosted
	// TODO: create modal to make boost selections
</script>

{#if weekBoosted === null || weekBoosted === undefined}
	<Dialog class="bg-surface-300 text-primary-content h-[75vh] w-[75vw] border-2 border-primary-content rounded-lg" open={true} persistent>
		<div class="grid w-full h-full p-8 justify-center">
			<div class="flex flex-row gap-4 text-fluid-xl">
				<h3>Individual Score</h3>
				<span>|</span>
				<h4 class="text-primary">Baller Boosts</h4>
			</div>
			<div>

			</div>
		</div>
	</Dialog>
{/if}

<WeekShell>
	{#snippet copy()}
		<TitleAndActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
	{/snippet}
	<div class="flex h-full flex-col gap-8 overflow-y-scroll md:flex-row">
		<TeamCard teamPlayerData={teamData?.team1} {displayName} {matchups} />
		<TeamCard teamPlayerData={teamData?.team2} {displayName} {matchups} />
	</div>
</WeekShell>
