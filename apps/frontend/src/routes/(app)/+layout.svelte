<script lang="ts">
	import Navigation from '$lib/components/shared/Navigation.svelte';

	import '../app.css';

	let { children, data } = $props();

	let navExpanded = $state(false);
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<div class={['flex flex-col', 'md:flex-row']}>
	<section
		class={[
			'absolute w-full',
			'transition-[height] duration-300 md:h-full md:transition-[width]',
			navExpanded ? 'h-64 md:w-60' : 'h-16 md:w-18.5'
		]}
	>
		<Navigation userId={data?.userId} bind:navExpanded></Navigation>
	</section>

	<main
		class={[
			'bg-surface-300 text-primary-content mt-16 flex h-full min-h-screen w-full flex-col p-4',
			'md:ml-18.5 md:mt-0 md:p-0',
			'transition-[filter] duration-300',
			navExpanded ? 'blur-xs brightness-80' : ''
		]}
		ontouchstart={() => (navExpanded = false)}
	>
		{@render children()}
	</main>
</div>
