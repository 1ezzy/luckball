<script lang="ts">
	import './app.css';

	let { children } = $props();
</script>

<main class="bg-surface-300 flex h-screen">
	<div class="flex w-full justify-center bg-[url('src/lib/assets/dash-bg.png')] bg-cover">
		{@render children()}
	</div>
</main>
