<script lang="ts">
	let { header, children } = $props();
</script>

<div class="flex w-full flex-col gap-4">
	<h3 class="text-secondary text-fluid-sm">{header}</h3>
	<hr class="border-t-primary-content block h-[1px] w-full border-0 border-t-2" />
	{@render children()}
</div>
