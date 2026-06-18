<script lang="ts">
	import PageShell from '$lib/components/shared/PageShell.svelte';
	import RouteCopy from '$lib/components/shared/title/RouteTitle.svelte';
	import RecordsCard from '$lib/components/records/RecordsCard.svelte';

	let {
		weekStatus,
		weekJoined,
		currentWeekText,
		userTeamAssignment,
		displayName,
		userTeamName,
		winningTeamName,
		totalWins,
		totalLosses,
		highestScoringTeamName,
		highestScoringTeamScore
	} = $props();
</script>

<div class="md:h-screen">
	<PageShell>
		<RouteCopy
			routeName="Records"
			{weekStatus}
			{weekJoined}
			{currentWeekText}
			{userTeamAssignment}
			{displayName}
			{userTeamName}
			{winningTeamName}
		/>
		<RecordsCard {totalWins} {totalLosses} {highestScoringTeamName} {highestScoringTeamScore} />
	</PageShell>
</div>
