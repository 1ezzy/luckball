<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { Button, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName, prevDisplayName } = $props();

	let loading = $state(false);

	onMount(() => {
		console.log(prevDisplayName);
	});
</script>

{#snippet joined()}
	<div class="my-auto flex w-full flex-col gap-8 text-center">
		<span>You've successfully joined {currentWeekText}!</span>
		<span class="text-primary">Display Name: {displayName}</span>
	</div>
{/snippet}

{#snippet joinForm()}
	<form
		class="my-auto flex w-full flex-col gap-8 text-center md:w-[50%]"
		method="post"
		action="?/joinWeek"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<h3 class="text-secondary text-2xl">Join {currentWeekText} now!</h3>
		<TextField name="displayName" placeholder="Enter Display Name" bind:value={prevDisplayName} />
		<Button
			type="submit"
			color="primary"
			variant="fill-outline"
			classes={{ root: '!text-wrap' }}
			{loading}
		>
			Join Week
		</Button>
	</form>
{/snippet}

{#if !weekJoined}
	{@render joinForm()}
{:else}
	{@render joined()}
{/if}
