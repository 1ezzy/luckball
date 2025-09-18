<script lang="ts">
	let { children, ...rest } = $props();
</script>

<div {...rest} class="h-4 w-12 rounded-full border-black px-2 text-sm">
	{@render children()}
</div>
