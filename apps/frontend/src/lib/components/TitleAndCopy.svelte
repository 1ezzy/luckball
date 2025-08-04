<script lang="ts">
	let { seasonPrefix, currentWeek } = $props();
</script>

<div class="hidden lg:block">
	<div class="flex max-w-2xl flex-col gap-8">
		<div class="flex w-full flex-row items-center gap-12">
			<h1 class="text-primary text-6xl font-bold">Luckball</h1>
			<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
		</div>
		<div class="flex w-full flex-col gap-8 leading-8">
			{seasonPrefix} Week {currentWeek} has not started yet. You can join the week by entering a display
			name on the left and clicking the "Join" button
		</div>
	</div>
</div>
<div class="hidden md:block lg:hidden">
	<div class="flex max-w-2xl flex-col gap-8">
		<div class="flex w-full flex-row items-center gap-12">
			<h1 class="text-primary text-6xl font-bold">Luckball</h1>
			<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
		</div>
		<div class="flex w-full flex-col gap-8 leading-8">
			{seasonPrefix} Week {currentWeek} has not started yet. You can join the week by entering a display
			name on the left and clicking the "Join" button
		</div>
	</div>
</div>
<div class="block md:hidden">
	<div class="flex flex-col gap-8 text-center">
		<div class="flex w-full flex-col items-center gap-4">
			<h1 class="text-primary text-6xl font-bold">Luckball</h1>
			<h1 class="text-2xl">It's all about the Luck Of The Ball</h1>
		</div>
		<div class="flex w-full flex-col gap-8 leading-8">
			{seasonPrefix} Week {currentWeek} has not started yet. You can join the week by entering a display
			name below and clicking the "Join" button
		</div>
	</div>
</div>
