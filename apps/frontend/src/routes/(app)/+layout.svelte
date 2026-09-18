<script lang="ts">
	import Navigation from '$lib/components/shared/Navigation.svelte';

	import '../app.css';

	let { children } = $props();

	let navExpanded = $state(false);
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<div class={['flex flex-col-reverse', 'md:flex-row']}>
	<section
		class={[
			'sticky md:absolute w-full z-100',
			'duration-300 md:h-full md:transition-[width]',
			navExpanded ? 'md:w-60' : 'md:w-18.5',
			'h-16 bottom-0 md:h-full'
		]}
	>
		<Navigation bind:navExpanded></Navigation>
	</section>

	<main
		class={[
			'bg-surface-300 text-primary-content flex h-full min-h-screen w-full flex-col p-4',
			'md:ml-18.5 md:mt-0 md:p-0',
			'transition-[filter] duration-300',
			navExpanded ? 'blur-xs brightness-80' : ''
		]}
		ontouchstart={() => (navExpanded = false)}
	>
		{@render children()}
	</main>
</div>
