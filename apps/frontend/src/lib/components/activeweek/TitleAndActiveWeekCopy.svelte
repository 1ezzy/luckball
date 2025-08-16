<script lang="ts">
	let { currentWeekText, weekJoined, userTeamAssignment } = $props();
</script>

{#snippet copyText()}
	<div class="flex w-full flex-col gap-2 text-start leading-8">
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
{/snippet}

{#snippet titleCopy()}
	<div class="flex w-full flex-row items-center gap-12">
		<h1 class="text-primary text-6xl font-bold">Luckball</h1>
		<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
	</div>
{/snippet}

<div class="hidden w-full lg:block">
	<div class="flex w-full flex-col gap-8">
		{@render titleCopy()}
		{@render copyText()}
	</div>
</div>
<div class="hidden w-full md:block lg:hidden">
	<div class="flex w-full flex-col gap-8">
		{@render titleCopy()}
		{@render copyText()}
	</div>
</div>
<div class="block md:hidden">
	<div class="flex flex-col gap-8 text-center">
		{@render titleCopy()}
		{@render copyText()}
	</div>
</div>
