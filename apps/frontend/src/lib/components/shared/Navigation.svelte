<script lang="ts">
	import { Button, NavItem } from 'svelte-ux';
	import { page } from '$app/state';
	import {
		LucideAward,
		LucideCalendar,
		LucideHouse,
		LucideIdCardLanyard,
		LucideLogOut,
		LucideSettings
	} from '@lucide/svelte';
	import type { Component } from 'svelte';
	import { authClient } from '$lib/clients/auth-client';
	import { invalidateAll } from '$app/navigation';

	let { navExpanded = $bindable() } = $props();

	let showSidebarProfile = $derived(page.data.flags['show-sidebar-profile']);
	let showSidebarSettings = $derived(page.data.flags['show-sidebar-settings']);
</script>

{#snippet navLink(Icon: Component, text: string, path: string)}
	<NavItem class="nav-btn" currentUrl={page.url} {path}>
		<Icon
			size={24}
			strokeWidth={2}
			class={[
				'shrink-0 transition-[width,height] duration-300',
				navExpanded ? 'h-4 w-4' : 'h-5 w-5'
			]}
		/>
		<span
			class={[
				'text-fluid-sm w-full transition-opacity duration-300',
				navExpanded ? 'opacity-100' : 'opacity-0'
			]}
		>
			{text}
		</span>
	</NavItem>
{/snippet}

{#snippet headerLink(Icon: Component, path: string)}
	<NavItem
		class="h-10 w-fit flex flex-row items-center justify-center gap-2 p-2"
		currentUrl={page.url}
		{path}
	>
		<Icon class="text-white" size={24} strokeWidth={2} />
	</NavItem>
{/snippet}

{#snippet loginLogoutNavButton()}
	<Button
		variant="none"
		class="nav-btn"
		on:click={async () => {
			await authClient.signOut();
			await invalidateAll();
		}}
	>
		<LucideLogOut
			class={[
				'shrink-0 transition-[width,height] duration-300',
				navExpanded ? 'h-4 w-4' : 'h-5 w-5'
			]}
			size={24}
			strokeWidth={2}
		/>
		<span
			class={[
				'text-fluid-sm w-full text-start transition-opacity duration-300',
				navExpanded ? 'opacity-100' : 'opacity-0'
			]}>Logout</span
		>
	</Button>
{/snippet}

<!-- desktop view -->
<nav
	class={['nav-shell hidden md:flex', navExpanded ? 'px-8' : 'px-4']}
	onmouseenter={() => (navExpanded = true)}
	onmouseleave={() => (navExpanded = false)}
>
	<div class="hidden h-full flex-col gap-8 md:flex">
		{@render navLink(LucideHouse, 'Home', '/')}
		{@render navLink(LucideCalendar, 'Schedule', '/schedule')}
		{#if showSidebarProfile}
			{@render navLink(LucideAward, 'Records', '/records')}
		{/if}
	</div>
	<div class="hidden h-full flex-col justify-end gap-8 md:flex">
		{#if showSidebarSettings}
			{@render navLink(LucideSettings, 'Settings', '/settings')}
		{/if}
		{@render loginLogoutNavButton()}
	</div>
</nav>

<!-- mobile view -->
<nav class="nav-shell flex md:hidden">
	<header class="w-full flex-1 grid grid-cols-4 gap-2 justify-items-center md:hidden">
		{@render headerLink(LucideHouse, '/')}
		{@render headerLink(LucideCalendar, '/schedule')}
		{@render headerLink(LucideIdCardLanyard, '/records')}
		{@render headerLink(LucideSettings, '/settings')}
	</header>
</nav>

<style>
	@reference "../../../routes/app.css";

	.nav-shell {
		@apply relative;
		@apply h-full;
		@apply flex-col;
		@apply bg-primary-400;
		@apply text-primary-content;
		@apply transition-[padding] duration-300;
	}

	@media (width < theme(--breakpoint-md)) {
		.nav-shell {
			@apply w-full px-4 py-4;
			@apply border-t-primary-content border-t-2;
			@apply items-center justify-center;
		}
	}

	@media (width >= theme(--breakpoint-md)) {
		.nav-shell {
			@apply border-r-primary-content border-r-2;
			@apply py-12;
		}
	}
</style>
