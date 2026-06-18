<script lang="ts">
	import { enhance } from '$app/forms';
</script>

{#snippet actionBtn(label: string)}
	<button class="btn self-end" type="submit">{label}</button>
{/snippet}

{#snippet actionDescription(description: string)}
	<span class="text-primary-content self-start text-center">{description}</span>
{/snippet}

{#snippet actionCard(action: string, btnLabel: string, description: string)}
	<form
		class="bg-surface-300 grid h-full w-full max-w-80 grid-rows-2 items-center justify-items-center gap-8 rounded-xl border-2 p-8"
		method="post"
		action="?/{action}"
		use:enhance
	>
		{@render actionBtn(btnLabel)}
		{@render actionDescription(description)}
	</form>
{/snippet}

<div
	class={[
		'grid h-full w-fit grid-cols-2 grid-rows-2 items-center justify-items-center gap-16 p-16'
	]}
>
	{@render actionCard('beginWeek', 'Begin Week', 'Moves the game to the "pending" status')}
	{@render actionCard(
		'startActiveWeek',
		'Start Active Week',
		'Moves the game to the "in_progress" status and seeds the Valkey database with matchups'
	)}
	{@render actionCard(
		'updateScores',
		'Update Matchup Scores',
		'Updates the match scores with mocked data for the "in_progress" game phase'
	)}
	{@render actionCard(
		'endWeek',
		'End Week',
		'Moves the game to the "ended" status, calculates winners, updates user records'
	)}
</div>
