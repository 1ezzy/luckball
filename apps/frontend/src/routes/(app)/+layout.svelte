<script lang="ts">
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/clients/auth-client';
	import { AppBar, AppLayout, NavItem, Button } from 'svelte-ux';
	import {
		LucideArrowRightFromLine,
		LucideAward,
		LucideCalendar,
		LucideHouse,
		LucideLogIn,
		LucideLogOut,
		LucideSettings
	} from '@lucide/svelte';
	import type { Component } from 'svelte';
	import '../app.css';

	let { children, data } = $props();

	let navExpanded = $state(true);
</script>

<svelte:head>
	<title>Luckball</title>
	<meta name="luckball" content="Team-based football matchup scramble" />
</svelte:head>

<AppLayout
	areas="'header header' 'aside main'"
	classes={{ nav: 'transition-[width] duration-500' }}
	navWidth={navExpanded ? 240 : 82}
>
	<svelte:fragment slot="nav">
		{#snippet navLink(Icon: Component, text: string, path: string)}
			<NavItem
				class={[
					'bg-surface-200 border-primary-content flex h-12 w-full flex-row items-center justify-start gap-2 rounded-lg border-2 p-2',
					'hover:bg-surface-100 overflow-hidden transition-colors duration-300'
				]}
				currentUrl={page.url}
				{path}
			>
				<Icon
					size={24}
					strokeWidth={2}
					class={[
						'shrink-0 transition-[width,height] duration-500',
						navExpanded ? 'h-4 w-4' : 'h-6 w-6'
					]}
				/>
				<span
					class={[
						'w-full transition-opacity duration-500',
						navExpanded ? 'opacity-100' : 'opacity-0'
					]}
				>
					{text}
				</span>
			</NavItem>
		{/snippet}
		<div
			class={[
				'bg-surface-300 text-primary-content border-r-primary-content items-between flex h-full flex-col border-r-2 py-12 transition-[padding] duration-500',
				navExpanded ? 'px-8' : 'px-4'
			]}
		>
			<div class="flex h-full flex-col gap-8">
				{@render navLink(LucideHouse, 'Home', '/')}
				{@render navLink(LucideCalendar, 'Schedule', '/schedule')}
				{@render navLink(LucideAward, 'Records', '/records')}
			</div>
			<div>
				{@render navLink(LucideSettings, 'Settings', '/settings')}
			</div>
		</div>
	</svelte:fragment>

	<AppBar title="Luckball" class="bg-primary text-primary-content gap-1 px-4 md:px-8">
		<svelte:fragment slot="title">
			<span class="text-fluid-lg ml-2 md:ml-4">Luckball</span>
		</svelte:fragment>
		<svelte:fragment slot="menuIcon">
			<Button
				on:click={() => {
					navExpanded = !navExpanded;
				}}
				class="rounded-lg p-2"
			>
				<LucideArrowRightFromLine
					size={20}
					strokeWidth={2}
					class={[
						'transition-transform duration-500',
						navExpanded ? 'scale-x-[-1]' : '',
						'h-4 w-4 md:h-5 md:w-5'
					]}
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
		class="bg-surface-300 text-primary-content flex h-full min-h-screen flex-col p-4 md:min-h-[calc(100vh-4rem)] md:p-0"
	>
		{@render children()}
	</main>
</AppLayout>
