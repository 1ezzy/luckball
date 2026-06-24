<script lang="ts">
	import PageTitle from '$lib/components/shared/title/PageTitle.svelte';
	import PostWeekCopy from '$lib/components/shared/copy/PostWeekCopy.svelte';
	import PreWeekCopy from '$lib/components/shared/copy/PreWeekCopy.svelte';
	import ActiveWeekCopy from '$lib/components/shared/copy/ActiveWeekCopy.svelte';
	import { WeekStatus } from '@luckball/game-logic/types';

	let { routeName, weekStatus, currentWeekText, weekJoined, ...others } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<PageTitle>
		<span class="text-fluid-2xl text-primary-content">|</span>
		<h2 class="text-fluid-2xl text-secondary">{routeName}</h2>
	</PageTitle>

	{#if weekStatus === WeekStatus.Pending}
		<PreWeekCopy {currentWeekText} {weekJoined} mainPage={others.mainPage} />
	{:else if weekStatus === WeekStatus.InProgress}
		<ActiveWeekCopy
			{currentWeekText}
			{weekJoined}
			mainPage={others.mainPage}
			userTeamAssignment={others.userTeamAssignment}
		/>
	{:else if weekStatus === WeekStatus.Ended}
		<PostWeekCopy
			{currentWeekText}
			mainPage={others.mainPage}
			displayName={others.displayName}
			winningTeamName={others.winningTeamName}
			userTeamName={others.userTeamName}
		/>
	{/if}
</div>
