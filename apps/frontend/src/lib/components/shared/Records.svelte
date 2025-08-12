<script lang="ts">
	import { onMount } from 'svelte';

	let wins: number = 0;
	let losses: number = 0;
	let winStreak: number = 0;
	let bestTeam: string = 'N/A';

	onMount(() => {
		const storedWins = localStorage.getItem('luckball_wins');
		if (storedWins) {
			wins = parseInt(storedWins, 10);
		}

		const storedLosses = localStorage.getItem('luckball_losses');
		if (storedLosses) {
			losses = parseInt(storedLosses, 10);
		}

		const storedWinStreak = localStorage.getItem('luckball_winStreak');
		if (storedWinStreak) {
			winStreak = parseInt(storedWinStreak, 10);
		}

		const storedTeam = localStorage.getItem('luckball_bestTeam');
		if (storedTeam) {
			bestTeam = storedTeam;
		}
	});
</script>

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
