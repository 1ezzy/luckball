<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-[100%-128px] flex-1 flex-col items-center gap-8 self-start p-8 md:my-16">
	{@render children()}
</div>
