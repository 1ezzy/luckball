<script lang="ts">
	import { page } from '$app/state';
	import PageShell from '$lib/components/shared/PageShell.svelte';
</script>

<div class="md:h-screen">
	<PageShell>
		<h1 class="text-fluid-4xl">{page.status} Error</h1>
		<span>{page.error?.message}</span>
	</PageShell>
</div>
