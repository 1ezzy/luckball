<script lang="ts">
	import Records from '$lib/components/layouts/records/Records.svelte';

	let { data } = $props();

	// declaring objects passed through the page
	const currentWeekText = $derived(data?.currentWeekText);
	const weekStatus = $derived(data?.weekStatus);
	const weekJoined = $derived(data?.weekJoined);
	const userTeamAssignment = $derived(data?.userTeamAssignment);
	const displayName = $derived(data?.currentDisplayName);
	const winningTeamName = $derived(data?.winningTeamName);
	const userTeamName = $derived(data?.userTeamName);

	const totalWins = $derived(data?.totalWins);
	const totalLosses = $derived(data?.totalLosses);
	const highestScoringTeamName = $derived(data?.highestScoringTeamName);
	const highestScoringTeamScore = $derived(data?.highestScoringTeamScore);
</script>

<Records
	{weekStatus}
	{weekJoined}
	{currentWeekText}
	{userTeamAssignment}
	{displayName}
	{userTeamName}
	{winningTeamName}
	{totalWins}
	{totalLosses}
	{highestScoringTeamName}
	{highestScoringTeamScore}
/>
