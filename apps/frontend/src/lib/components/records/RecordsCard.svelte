<script lang="ts">
	import { Card } from 'svelte-ux';

	let wins: number = 0;
	let losses: number = 0;
	let winStreak: number = 0;
	let bestTeam: string = 'N/A';
</script>

<Card class="flex h-full flex-1 items-center justify-center p-8">
	<div class="hidden lg:block">
		<div class="flex flex-col gap-16 text-center">
			<div class="flex flex-col gap-4">
				<h2 class="text-secondary mb-2 text-2xl">Record (All-Time)</h2>
				<span class="text-sm">{wins} wins</span>
				<span class="text-sm">{losses} losses</span>
				<span class="text-sm">Current win streak: {winStreak}</span>
			</div>
			<div class="flex flex-col gap-4">
				<h2 class="text-secondary mb-2 text-2xl">Other Stats</h2>
				<span class="text-sm">Your Best Team: coming soon</span>
			</div>
		</div>
	</div>
	<div class="hidden md:block lg:hidden">
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
	</div>
	<div class="block md:hidden">
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
	</div>
</Card>
