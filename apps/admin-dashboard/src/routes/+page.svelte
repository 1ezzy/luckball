<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
</script>

{#snippet actionBtn(label: string)}
	<button class="btn" type="submit">{label}</button>
{/snippet}

{#snippet actionCard(btn: Snippet)}
	<div></div>
{/snippet}

<div
	class="flex h-full w-full flex-1 items-center justify-center bg-[url('src/lib/assets/topo.svg')]"
>
	<div class="flex h-full w-full flex-col items-center justify-center gap-8">
		<form method="post" action="?/beginWeek" use:enhance>
			{@render actionBtn('Begin Week')}
		</form>
		<form method="post" action="?/startActiveWeek" use:enhance>
			{@render actionBtn('Start Active Week')}
		</form>
		<form method="post" action="?/endWeek" use:enhance>
			{@render actionBtn('End Week')}
		</form>
		<form method="post" action="?/updateScores" use:enhance>
			{@render actionBtn('Update Matchup Scores')}
		</form>
	</div>
</div>
