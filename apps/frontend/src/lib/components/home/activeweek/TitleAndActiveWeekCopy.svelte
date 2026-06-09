<script lang="ts">
	import PageTitle from '$lib/components/shared/PageTitle.svelte';

	let { currentWeekText, weekJoined, userTeamAssignment } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<PageTitle />
	<div class="flex w-full flex-col gap-2 leading-8">
		{#if weekJoined}
			<span>
				{currentWeekText} has begun! You can track both teams below; you are on team
				<span class="text-primary font-bold">{userTeamAssignment}</span>.
			</span>
		{:else}
			<span>
				{currentWeekText} has begun! You didn't join a team this week; you can track this week's teams
				below and join again next week.
			</span>
		{/if}
	</div>
</div>
