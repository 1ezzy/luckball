<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName } = $props();

	let loading = $state(false);
</script>

{#snippet joined()}
	<div class="flex w-full flex-col gap-8 text-center">
		<span>You've successfully joined {currentWeekText}!</span>
		<span class="text-primary">Display Name: {displayName}</span>
	</div>
{/snippet}

{#snippet joinForm()}
	<form
		class="flex w-full flex-col gap-8 text-center md:w-[50%]"
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
		<TextField name="displayName" placeholder="Enter Display Name" />
		<Button
			type="submit"
			color="primary"
			variant="fill-outline"
			classes={{ root: '!text-wrap' }}
			{loading}
		>
			Join {currentWeekText}
		</Button>
	</form>
{/snippet}

{#if !weekJoined}
	{@render joinForm()}
{:else}
	{@render joined()}
{/if}
