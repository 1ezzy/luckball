<script lang="ts">
	let { children } = $props();
</script>

<div class="flex w-full flex-col items-center gap-4 md:flex-row md:gap-12">
	<h1 class="text-primary text-fluid-4xl font-bold leading-tight">Luckball</h1>
	{@render children()}
</div>
