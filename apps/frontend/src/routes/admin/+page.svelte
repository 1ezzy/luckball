<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'svelte-ux';
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-8">
	<form method="post" action="?/beginWeek" use:enhance>
		<Button type="submit" variant="fill">Begin Week</Button>
	</form>
	<form method="post" action="?/startActiveWeek" use:enhance>
		<Button type="submit" variant="fill">Start Active Week</Button>
	</form>
	<form method="post" action="?/endWeek" use:enhance>
		<Button type="submit" variant="fill">End Week</Button>
	</form>
	<form method="post" action="?/updateScores" use:enhance>
		<Button type="submit" variant="fill">Update Matchups</Button>
	</form>
</div>
