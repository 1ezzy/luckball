<script lang="ts">
	import PageTitle from '$lib/components/shared/PageTitle.svelte';

	let { currentWeekText, displayName, winningTeamName, userTeamName } = $props();

	let won = winningTeamName === userTeamName;
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<PageTitle />
	<div class="flex w-full flex-col gap-2 leading-8">
		{#if displayName}
			<span class="text-2xl">
				<span class="text-secondary">{displayName},</span>
				{won ? 'You Won This Week!' : 'You Lost This Week'}
			</span>
		{/if}
		<span>
			{currentWeekText} has ended! Check out this week's winning team below. The next round starts soon.
		</span>
	</div>
</div>
