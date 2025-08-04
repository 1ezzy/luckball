<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	const isDesktop = new MediaQuery('(min-width: 1024px)');
	const isTablet = new MediaQuery('(min-width: 768px) and (max-width: 1023px)');
</script>

{#if isDesktop.current}
	<div class="flex flex-col gap-16 text-center">
		<div class="flex flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Record (All-Time)</h2>
			<span class="text-sm">0 wins</span>
			<span class="text-sm">0 losses</span>
			<span class="text-sm">Current win streak: 0</span>
		</div>
		<div class="flex flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Other Stats</h2>
			<span class="text-sm">Your Best Team: n/a</span>
		</div>
	</div>
{:else if isTablet.current}
	<div class="flex flex-col gap-16 text-center">
		<div class="flex flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Record (All-Time)</h2>
			<span class="text-sm">0 wins</span>
			<span class="text-sm">0 losses</span>
			<span class="text-sm">Current win streak: 0</span>
		</div>
		<div class="flex flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Other Stats</h2>
			<span class="text-sm">Your Best Team: n/a</span>
		</div>
	</div>
{:else}
	<div class="flex flex-col gap-16 text-center">
		<div class="flex flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Record (All-Time)</h2>
			<span class="text-sm">0 wins</span>
			<span class="text-sm">0 losses</span>
			<span class="text-sm">Current win streak: 0</span>
		</div>
		<div class="flex flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Other Stats</h2>
			<span class="text-sm">Your Best Team: n/a</span>
		</div>
	</div>
{/if}
