<script lang="ts">
	import './app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<div class="flex h-screen w-full flex-col">
	{@render children()}
</div>
