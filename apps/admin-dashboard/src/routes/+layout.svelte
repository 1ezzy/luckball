<script lang="ts">
	import './app.css';

	let { children } = $props();
</script>

<main class="bg-surface-300 flex h-screen">
	{@render children()}
</main>
