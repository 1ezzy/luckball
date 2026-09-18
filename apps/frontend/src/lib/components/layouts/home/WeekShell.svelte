<script lang="ts">
	import PageShell from '$lib/components/shared/PageShell.svelte';
	import type { Snippet } from 'svelte';

	let { copy, children }: { copy: Snippet; children: Snippet } = $props();
</script>

<div class="md:h-screen">
	<PageShell>
		{@render copy()}
		<div class="flex h-full w-full flex-col gap-8 overflow-hidden md:my-auto">
			{@render children()}
		</div>
	</PageShell>
</div>
