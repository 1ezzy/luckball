<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { enhance } from '$app/forms';
	import { Button, TextField } from 'svelte-ux';

	const isDesktop = new MediaQuery('(min-width: 1024px)');
	const isTablet = new MediaQuery('(min-width: 768px) and (max-width: 1023px)');

	let { weekJoined, seasonPrefix, currentWeek, displayName } = $props();
</script>

{#if isDesktop.current}
	{#if !weekJoined}
		<form
			class="flex w-full flex-col gap-8 text-center"
			method="post"
			action="?/joinWeek"
			use:enhance
		>
			<TextField name="displayName" placeholder="Enter Display Name" />
			<Button type="submit" color="primary" variant="fill-outline" classes={{ root: '!text-wrap' }}>
				Join {seasonPrefix} Week {currentWeek}
			</Button>
		</form>
	{:else}
		<div class="flex w-full flex-col gap-8 text-center">
			<span>You've successfully joined {seasonPrefix} Week {currentWeek}!</span>
			<span class="text-primary">Display Name: {displayName}</span>
		</div>
	{/if}
{:else if isTablet.current}
	{#if !weekJoined}
		<form
			class="flex w-full flex-col gap-8 text-center"
			method="post"
			action="?/joinWeek"
			use:enhance
		>
			<TextField name="displayName" placeholder="Enter Display Name" />
			<Button type="submit" color="primary" variant="fill-outline" classes={{ root: '!text-wrap' }}>
				Join {seasonPrefix} Week {currentWeek}
			</Button>
		</form>
	{:else}
		<div class="flex w-full flex-col gap-8 text-center">
			<span>You've successfully joined {seasonPrefix} Week {currentWeek}!</span>
			<span class="text-primary">Display Name: {displayName}</span>
		</div>
	{/if}
{:else if !weekJoined}
	<form
		class="flex w-full flex-col gap-8 text-center"
		method="post"
		action="?/joinWeek"
		use:enhance
	>
		<TextField name="displayName" placeholder="Enter Display Name" />
		<Button type="submit" color="primary" variant="fill-outline" classes={{ root: '!text-wrap' }}>
			Join {seasonPrefix} Week {currentWeek}
		</Button>
	</form>
{:else}
	<div class="flex w-full flex-col gap-8 text-center">
		<span>You've successfully joined {seasonPrefix} Week {currentWeek}!</span>
		<span class="text-primary">Display Name: {displayName}</span>
	</div>
{/if}
