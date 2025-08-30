<script lang="ts">
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/clients/auth-client';
	import { AppBar, AppLayout, NavItem, Button } from 'svelte-ux';
	import {
		LucideCalendar,
		LucideHouse,
		LucideLogIn,
		LucideLogOut,
		LucideMedal,
		LucideMenu
	} from '@lucide/svelte';
	import '../app.css';

	let { children, data } = $props();

	let menuOpen = $state(true);
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<AppLayout areas="'header header' 'aside main'">
	<svelte:fragment slot="nav">
		<nav class="bg-surface-200 flex h-full flex-col items-start gap-8 px-8 py-16">
			<div class="flex flex-row items-center justify-center gap-2">
				<LucideHouse size={20} strokeWidth={3} />
				<NavItem text="Home" currentUrl={page.url} path="/" />
			</div>
			<div class="flex flex-row items-center justify-center gap-2">
				<LucideCalendar size={20} strokeWidth={3} />
				<NavItem text="Schedule" currentUrl={page.url} path="/schedule" />
			</div>
			<div class="flex flex-row items-center justify-center gap-2">
				<LucideMedal size={20} strokeWidth={3} />
				<NavItem text="Records" currentUrl={page.url} path="/records" />
			</div>
		</nav>
	</svelte:fragment>

	<AppBar title="Luckball" class="bg-primary text-primary-content px-8">
		<svelte:fragment slot="menuIcon" let:toggleMenu let:isMenuOpen>
			<Button
				on:click={() => {
					toggleMenu();
					menuOpen = isMenuOpen;
				}}
				class="p-1"
			>
				<LucideMenu size={20} strokeWidth={3} />
			</Button>
		</svelte:fragment>
		<div slot="actions">
			{#if data?.session}
				<Button
					class="flex flex-row items-center gap-2 rounded-xl"
					on:click={async () => {
						await authClient.signOut();
						await invalidateAll();
					}}
				>
					<span>Logout</span>
					<LucideLogOut size={20} strokeWidth={3} />
				</Button>
			{:else}
				<Button class="flex flex-row items-center gap-2 rounded-xl" href="/login">
					<span>Login</span>
					<LucideLogIn size={20} strokeWidth={3} />
				</Button>
			{/if}
		</div>
	</AppBar>

	<main
		class={[
			'bg-surface-300 flex h-full min-h-screen flex-col p-4 md:min-h-[calc(100vh-4rem)] md:p-0',
			menuOpen ? 'border-l-1 border-l-gray-500' : ''
		]}
	>
		{@render children()}
	</main>
</AppLayout>
