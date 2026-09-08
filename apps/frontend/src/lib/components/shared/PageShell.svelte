<script lang="ts">
	let { children } = $props();
</script>

<div
	class={[
		'mx-auto flex h-full w-full flex-1 flex-col gap-16 p-8',
		'md:flex-none md:items-center md:justify-center md:gap-16 md:px-8 md:py-12',
		'lg:justify-start lg:overflow-hidden',
		'xl:w-[90vw] xl:gap-12 xl:px-8 xl:py-12',
		'2xl:w-[80vw] 2xl:gap-16 2xl:px-12 2xl:py-16'
	]}
>
	{@render children()}
</div>
