<script lang="ts">
	let { children } = $props();
</script>

<div
	class={[
		'mx-auto flex h-full w-full flex-1 flex-col gap-16 p-8',
		'md:flex-none md:items-center md:justify-center md:gap-8 md:px-16 md:py-20',
		'lg:justify-start lg:overflow-hidden',
		'xl:w-[80vw] xl:gap-12 xl:px-20 xl:py-24',
		'2xl:w-[60vw] 2xl:gap-16 2xl:px-24 2xl:py-28'
	]}
>
	{@render children()}
</div>
