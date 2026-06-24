<script lang="ts">
	import PageShell from '$lib/components/shared/PageShell.svelte';
	import RouteCopy from '$lib/components/shared/title/RouteTitle.svelte';
	import ScheduleCard from '$lib/components/schedule/ScheduleCard.svelte';

	let {
		weekStatus,
		weekJoined,
		matchups,
		currentWeekText,
		userTeamAssignment,
		displayName,
		winningTeamName,
		userTeamName
	} = $props();
</script>

<div class="md:h-screen">
	<PageShell>
		<RouteCopy
			routeName="Schedule"
			{weekStatus}
			{weekJoined}
			{currentWeekText}
			{userTeamAssignment}
			{displayName}
			{userTeamName}
			{winningTeamName}
			mainPage={false}
		/>
		<ScheduleCard {matchups} />
	</PageShell>
</div>
