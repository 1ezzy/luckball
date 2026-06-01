<script lang="ts">
	import Schedule from '$lib/components/layouts/schedule/Schedule.svelte';

	let { data } = $props();

	// declaring objects passed through the page
	const currentWeekText = $derived(data?.currentWeekText);
	const matchups = $derived(data?.weekMatchups?.matchupData);
	const weekStatus = $derived(data?.weekStatus);
	const weekJoined = $derived(data?.weekJoined);
	const userTeamAssignment = $derived(data?.userTeamAssignment);
	const displayName = $derived(data?.displayName);
	const winningTeamName = $derived(data?.winningTeamName);
	const userTeamName = $derived(data?.userTeamName);
</script>

<Schedule
	{weekStatus}
	{weekJoined}
	{matchups}
	{currentWeekText}
	{userTeamAssignment}
	{displayName}
	{winningTeamName}
	{userTeamName}
/>
