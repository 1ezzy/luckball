<script lang="ts">
	let { header, children } = $props();
</script>

<div class="flex w-full flex-col gap-1">
	<h3 class="text-accent">{header}</h3>
	<hr class="block h-[1px] w-full border-0 border-t-2 border-t-black" />
	<div class="grid grid-cols-1 gap-2 md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
		{@render children()}
	</div>
</div>
