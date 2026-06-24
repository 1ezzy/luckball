<script lang="ts">
	import { Button, NavItem } from 'svelte-ux';
	import { page } from '$app/state';
	import {
		LucideAward,
		LucideCalendar,
		LucideHouse,
		LucideLogIn,
		LucideLogOut,
		LucideMenu,
		LucideSettings
	} from '@lucide/svelte';
	import type { Component } from 'svelte';
	import { fade } from 'svelte/transition';
	import { authClient } from '$lib/clients/auth-client';
	import { invalidateAll } from '$app/navigation';

	let { userId, navExpanded = $bindable() } = $props();
</script>

{#snippet navLink(Icon: Component, text: string, path: string)}
	<NavItem
		class={[
			'bg-surface-200 border-primary-content flex h-10 w-full flex-row items-center justify-start gap-2 rounded-lg border-2 p-2',
			'hover:bg-surface-100 overflow-hidden transition-colors duration-300'
		]}
		currentUrl={page.url}
		{path}
	>
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

{#snippet headerLink(Icon: Component, text: string, path: string)}
	<NavItem
		on:click={() => (navExpanded = false)}
		class={[
			'h-10 w-full flex-row items-center justify-start gap-2 p-2 transition-opacity duration-300',
			navExpanded ? 'flex' : 'hidden'
		]}
		currentUrl={page.url}
		{path}
	>
		<Icon size={16} strokeWidth={2} class="" />
		<span class="w-full">
			{text}
		</span>
	</NavItem>
{/snippet}

{#snippet loginLogoutNavButton()}
	{#if userId}
		<Button
			class={[
				'bg-surface-200 border-primary-content flex h-10 w-full flex-row items-center justify-start gap-2 rounded-lg border-2 p-2',
				'hover:bg-surface-100 overflow-hidden transition-colors duration-300 hover:cursor-pointer'
			]}
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
	{:else}
		<Button
			class={[
				'bg-surface-200 border-primary-content flex h-10 w-full flex-row items-center justify-start gap-2 rounded-lg border-2 p-2',
				'hover:bg-surface-100 overflow-hidden transition-colors duration-300 hover:cursor-pointer'
			]}
			href="/login"
		>
			<LucideLogIn
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
				]}>Login</span
			>
		</Button>
	{/if}
{/snippet}

<nav
	class={['nav-shell', navExpanded ? 'px-8' : 'px-4']}
	onmouseenter={() => (navExpanded = true)}
	onmouseleave={() => (navExpanded = false)}
>
	<div class="hidden h-full flex-col gap-8 md:flex">
		{@render navLink(LucideHouse, 'Home', '/')}
		{@render navLink(LucideCalendar, 'Schedule', '/schedule')}
		{@render navLink(LucideAward, 'Records', '/records')}
	</div>
	<div class="hidden h-full flex-col justify-end gap-8 md:flex">
		{@render navLink(LucideSettings, 'Settings', '/settings')}
		{@render loginLogoutNavButton()}
	</div>
	<header class="flex flex-col gap-1 md:hidden">
		{#if !navExpanded}
			<button
				in:fade={{ duration: 300 }}
				class="flex flex-row items-center justify-center gap-2"
				onclick={() => (navExpanded = true)}
			>
				<LucideMenu size={24} strokeWidth={2} class="" />
				<span>Menu</span>
			</button>
		{:else}
			<div in:fade={{ duration: 500 }} class="flex flex-col gap-1">
				{@render headerLink(LucideHouse, 'Home', '/')}
				{@render headerLink(LucideCalendar, 'Schedule', '/schedule')}
				{@render headerLink(LucideAward, 'Records', '/records')}
				{@render headerLink(LucideSettings, 'Settings', '/settings')}
			</div>
		{/if}
	</header>
</nav>

<style>
	@reference "../../../routes/app.css";

	.nav-shell {
		@apply relative z-10;
		@apply h-full;
		@apply flex flex-col;
		@apply bg-primary-400;
		@apply text-primary-content;
		@apply transition-[padding] duration-300;
	}

	@media (width < theme(--breakpoint-md)) {
		.nav-shell {
			@apply w-full px-4 py-4;
			@apply border-b-primary-content border-b-2;
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
