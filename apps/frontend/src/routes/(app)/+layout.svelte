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
			navExpanded ? 'h-64 md:w-[240px]' : 'h-16 md:w-[74px]'
		]}
	>
		<Navigation userId={data?.userId} bind:navExpanded></Navigation>
	</section>

	<main
		class={[
			'bg-surface-300 text-primary-content mt-16 flex h-full min-h-screen w-full flex-col p-4',
			'md:ml-[74px] md:mt-0 md:p-0',
			'transition-[filter] duration-300',
			navExpanded ? 'blur-xs brightness-80' : ''
		]}
		ontouchstart={() => (navExpanded = false)}
	>
		{@render children()}
	</main>

	<!-- <AppBar title="Luckball" class="bg-primary-500 gap-1 px-4 text-white md:px-8" menuIcon={null}>
		<svelte:fragment slot="title">
			<span class="text-fluid-lg ml-2 md:ml-4">Luckball</span>
		</svelte:fragment>
		<div slot="actions">
			{#if data?.userId}
				<Button
					class="flex flex-row items-center gap-2 rounded-xl"
					on:click={async () => {
						await authClient.signOut();
						await invalidateAll();
					}}
				>
					<span>Logout</span>
					<LucideLogOut size={16} strokeWidth={2} />
				</Button>
			{:else}
				<Button class="flex flex-row items-center gap-2 rounded-xl" href="/login">
					<span>Login</span>
					<LucideLogIn size={16} strokeWidth={2} />
				</Button>
			{/if}
		</div>
	</AppBar> -->
</div>
