<script lang="ts">
	import { page } from '$app/state';
	import PageShell from '$lib/components/shared/PageShell.svelte';
</script>

<div class="hidden h-[calc(100vh-4rem)] lg:block">
	<PageShell>
		<h1 class="text-6xl">{page.status} Error</h1>
		<span>{page.error?.message}</span>
	</PageShell>
</div>
<div class="hidden h-[calc(100vh-4rem)] md:block lg:hidden">
	<PageShell>
		<h1 class="text-6xl">{page.status} Error</h1>
		<span>{page.error?.message}</span>
	</PageShell>
</div>
<div class="block md:hidden">
	<PageShell>
		<h1 class="text-6xl">{page.status} Error</h1>
		<span>{page.error?.message}</span>
	</PageShell>
</div>
