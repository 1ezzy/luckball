<script lang="ts">
	let { seasonPrefix, currentWeek, weekJoined, teamName } = $props();
</script>

<div class="hidden lg:block">
	<div class="flex max-w-2xl flex-col gap-8">
		<div class="flex w-full flex-row items-center gap-12">
			<h1 class="text-primary text-6xl font-bold">Luckball</h1>
			<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
		</div>
		<div class="flex w-full flex-col gap-2 leading-8">
			{#if weekJoined}
				<span>
					{seasonPrefix} Week {currentWeek} has begun! You can track this week's teams on the right.
				</span>
				<span>You are on team <span class="text-primary font-bold">{teamName}</span>.</span>
			{:else}
				<span>
					{seasonPrefix} Week {currentWeek} has begun! You didn't join a team this week; you can track
					this week's teams on the right and join again next week.
				</span>
			{/if}
		</div>
	</div>
</div>
<div class="hidden md:block lg:hidden">
	<div class="flex max-w-2xl flex-col gap-8">
		<div class="flex w-full flex-row items-center gap-12">
			<h1 class="text-primary text-6xl font-bold">Luckball</h1>
			<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
		</div>
		<div class="flex w-full flex-col gap-2 leading-8">
			{#if weekJoined}
				<span>
					{seasonPrefix} Week {currentWeek} has begun! You can track this week's teams on the right.
				</span>
				<span>You are on team <span class="text-primary font-bold">{teamName}</span>.</span>
			{:else}
				<span>
					{seasonPrefix} Week {currentWeek} has begun! You didn't join a team this week; you can track
					this week's teams on the right and join again next week.
				</span>
			{/if}
		</div>
	</div>
</div>
<div class="block md:hidden">
	<div class="flex flex-col gap-8 text-center">
		<div class="flex w-full flex-col items-center gap-4">
			<h1 class="text-primary text-6xl font-bold">Luckball</h1>
			<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
		</div>
		<div class="flex w-full flex-col gap-2 leading-8">
			{#if weekJoined}
				<span>
					{seasonPrefix} Week {currentWeek} has begun! You can track this week's teams on the right.
				</span>
				<span>You are on team <span class="text-primary font-bold">{teamName}</span>.</span>
			{:else}
				<span>
					{seasonPrefix} Week {currentWeek} has begun! You didn't join a team this week; you can track
					this week's teams on the right and join again next week.
				</span>
			{/if}
		</div>
	</div>
</div>
