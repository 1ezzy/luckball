<script lang="ts">
	import PageShell from '$lib/components/shared/PageShell.svelte';
	import type { Snippet } from 'svelte';

	let { copy, children }: { copy: Snippet; children: Snippet } = $props();
</script>

<div class="md:h-screen">
	<PageShell>
		{@render copy()}
		<hr class="h-[1px] w-full border-0 border-t-2 border-t-black md:hidden" />
		<div class="flex h-full w-full flex-col gap-8 overflow-y-scroll md:my-auto">
			{@render children()}
		</div>
	</PageShell>
</div>
