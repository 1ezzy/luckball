<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, TextField } from 'svelte-ux';

	let { weekJoined, seasonPrefix, currentWeek, displayName } = $props();
</script>

<div class="hidden lg:block">
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
</div>
<div class="hidden md:block lg:hidden">
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
</div>
<div class="block md:hidden">
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
</div>
