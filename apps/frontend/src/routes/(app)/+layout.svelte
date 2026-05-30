<script lang="ts">
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/clients/auth-client';
	import { AppBar, AppLayout, NavItem, Button } from 'svelte-ux';
	import {
		LucideArrowRightFromLine,
		LucideCalendar,
		LucideHouse,
		LucideLogIn,
		LucideLogOut,
		LucideTrophy
	} from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { Component } from 'svelte';
	import '../app.css';

	let { children, data } = $props();

	let navOpen = $state(true);
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<AppLayout areas="'header header' 'aside main'">
	<svelte:fragment slot="nav">
		{#snippet navLink(Icon: Component, text: string, path: string)}
			<NavItem
				class={[
					'bg-surface-200 flex w-full flex-row items-center justify-start gap-2 rounded-lg border-2 p-2',
					'hover:bg-surface-100 transition-colors duration-300'
				]}
				currentUrl={page.url}
				{path}
			>
				<Icon size={16} strokeWidth={2} />
				<span class="w-full">{text}</span>
			</NavItem>
		{/snippet}
		<nav
			class="bg-surface-300 text-primary-content flex h-full flex-col items-start gap-8 px-8 py-12"
		>
			{@render navLink(LucideHouse, 'Home', '/')}
			{@render navLink(LucideCalendar, 'Schedule', '/schedule')}
			{@render navLink(LucideTrophy, 'Records', '/records')}
		</nav>
	</svelte:fragment>

	<AppBar title="Luckball" class="bg-primary text-primary-content gap-1 px-8">
		<svelte:fragment slot="menuIcon" let:toggleMenu>
			<Button
				on:click={() => {
					navOpen = !navOpen;
					toggleMenu();
				}}
				class="rounded-lg p-2"
			>
				<LucideArrowRightFromLine
					size={20}
					strokeWidth={2}
					class={['transition-transform duration-500', navOpen ? 'scale-x-[-1]' : '']}
				/>
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
					<LucideLogOut size={16} strokeWidth={2} />
				</Button>
			{:else}
				<Button class="flex flex-row items-center gap-2 rounded-xl" href="/login">
					<span>Login</span>
					<LucideLogIn size={16} strokeWidth={2} />
				</Button>
			{/if}
		</div>
	</AppBar>

	<main
		class="bg-surface-300 text-primary-content relative flex h-full min-h-screen flex-col p-4 md:min-h-[calc(100vh-4rem)] md:p-0"
	>
		{#if navOpen}
			<div
				class="absolute inset-y-0 left-0 border-2 border-l border-l-gray-500"
				out:fade={{ duration: 500 }}
			></div>
		{/if}
		{@render children()}
	</main>
</AppLayout>
