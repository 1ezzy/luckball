<script lang="ts">
	import { enhance } from '$app/forms';
</script>

{#snippet actionBtn(label: string)}
	<button class="btn" type="submit">{label}</button>
{/snippet}

{#snippet actionDescription(description: string)}
	<span class="text-primary-content text-center">{description}</span>
{/snippet}

{#snippet actionCard(btnLabel: string, description: string)}
	<form
		class="bg-surface-300 flex w-full flex-col items-center justify-center gap-4 rounded-xl border-2 p-8"
		method="post"
		action="?/beginWeek"
		use:enhance
	>
		{@render actionBtn(btnLabel)}
		{@render actionDescription(description)}
	</form>
{/snippet}

<div
	class="flex h-full w-full flex-1 items-center justify-center bg-[url('src/lib/assets/dash-bg.png')] bg-cover"
>
	<div class="flex h-full w-1/5 flex-col items-center justify-center gap-8">
		{@render actionCard('Begin Week', 'Moves the game to the "pending" status')}
		{@render actionCard(
			'Start Active Week',
			'Moves the game to the "in_progress" status and seeds the Valkey database with matchups'
		)}
		{@render actionCard(
			'Update Matchup Scores',
			'Updates the match scores with mocked data for the "in_progress" game phase'
		)}
		{@render actionCard(
			'End Week',
			'Moves the game to the "ended" status, calculates winners, updates user records'
		)}
	</div>
</div>
