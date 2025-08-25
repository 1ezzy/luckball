<script lang="ts">
	let { children } = $props();
</script>

<div class="hidden h-[calc(100vh-4rem)] items-center justify-center overflow-hidden lg:flex">
	<div
		class="flex h-full w-full flex-col items-center justify-start gap-8 px-12 py-16 xl:w-[80vw] 2xl:w-[60vw] 2xl:gap-16 2xl:px-16 2xl:py-20"
	>
		{@render children()}
	</div>
</div>
<div class="hidden h-[calc(100vh-4rem)] items-center justify-center md:flex lg:hidden">
	<div class="flex flex-col items-center justify-center gap-8 px-12 py-16">
		{@render children()}
	</div>
</div>
<div class="block md:hidden">
	<div class="flex w-full flex-1 flex-col gap-16 p-8">
		{@render children()}
	</div>
</div>
