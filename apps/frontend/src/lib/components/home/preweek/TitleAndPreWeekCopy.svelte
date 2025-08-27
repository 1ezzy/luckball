<script lang="ts">
	let { currentWeekText, mainPage = true } = $props();
</script>

{#snippet textAndCopy(mobileGap: boolean)}
	<div class="flex w-full flex-col items-center gap-12 md:flex-row">
		<h1 class="text-primary text-6xl font-bold">Luckball</h1>
		<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
	</div>
	<div class="flex w-full flex-col gap-8 leading-8">
		{currentWeekText} has not started yet. {mainPage
			? 'You can join the week by entering a display name and clicking the "Join" button.'
			: 'You can join on the home page.'}
	</div>
{/snippet}

<div class="hidden lg:block">
	<div class="flex max-w-2xl flex-col gap-4 2xl:gap-8">
		{@render textAndCopy(false)}
	</div>
</div>
<div class="hidden md:block lg:hidden">
	<div class="flex max-w-2xl flex-col gap-4">
		{@render textAndCopy(false)}
	</div>
</div>
<div class="block md:hidden">
	<div class="flex flex-col gap-4 text-center">
		{@render textAndCopy(true)}
	</div>
</div>
