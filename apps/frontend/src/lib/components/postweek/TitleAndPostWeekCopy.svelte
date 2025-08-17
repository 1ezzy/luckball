<script lang="ts">
	let { seasonPrefix, currentWeek, displayName, teamName, userTeamName } = $props();

	let won = teamName === userTeamName;
</script>

{#snippet textAndCopy(mobileGap: boolean)}
	<div class="flex w-full flex-col items-center gap-12 md:flex-row">
		<h1 class="text-primary text-6xl font-bold">Luckball</h1>
		<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
	</div>
	<div class="flex w-full flex-col gap-2 leading-8">
		<span class="text-accent text-2xl">
			<span class="text-white">{displayName},</span>
			{won ? 'You Won This Week!' : 'You Lost This Week'}
		</span>
		<span>
			{seasonPrefix} Week {currentWeek} has ended! Check out this week's winning team below. The next
			round starts soon.
		</span>
	</div>
{/snippet}

<div class="hidden w-full lg:block">
	<div class="flex w-full flex-col gap-8">
		{@render textAndCopy(false)}
	</div>
</div>
<div class="hidden w-full md:block lg:hidden">
	<div class="flex w-full flex-col gap-8">
		{@render textAndCopy(false)}
	</div>
</div>
<div class="block md:hidden">
	<div class="flex flex-col gap-8 text-center">
		{@render textAndCopy(true)}
	</div>
</div>
