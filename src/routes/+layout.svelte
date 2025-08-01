<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import './app.css';

	const desktopView = new MediaQuery('min-width: 768px');

	let { children } = $props();
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<div class="flex min-h-screen w-full flex-col">
	{@render children()}
</div>
