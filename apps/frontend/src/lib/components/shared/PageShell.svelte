<script lang="ts">
	let { children } = $props();
</script>

<div class="hidden h-[calc(100vh-4rem)] items-center justify-center lg:flex">
	<div class="flex flex-col items-center justify-center gap-16 px-16 py-20 xl:w-[50vw]">
		{@render children()}
	</div>
</div>
<div class="hidden h-[calc(100vh-4rem)] items-center justify-center md:flex lg:hidden">
	<div class="flex flex-col items-center justify-center gap-16 px-16 py-20">
		{@render children()}
	</div>
</div>
<div class="block md:hidden">
	<div class="flex w-full flex-1 flex-col gap-16 p-8">
		{@render children()}
	</div>
</div>
