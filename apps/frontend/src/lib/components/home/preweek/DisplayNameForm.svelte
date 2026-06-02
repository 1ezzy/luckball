<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Card, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName, prevDisplayName } = $props();

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
		class="flex w-full flex-col gap-8 md:w-[50%]"
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
		<TextField
			classes={{ container: 'border-2' }}
			name="displayName"
			placeholder="Enter Display Name"
			bind:value={prevDisplayName}
		/>
		<Button
			type="submit"
			color="primary"
			variant="outline"
			classes={{ root: '!text-wrap border-2' }}
			{loading}
		>
			Join Week
		</Button>
	</form>
{/snippet}

{#if !weekJoined}
	<Card
		class="bg-surface-200 flex h-full w-full flex-auto flex-col items-center justify-center gap-8 border-2 p-8 text-center md:w-[50%]"
	>
		{@render joinForm()}
	</Card>
{:else}
	<Card
		class="bg-surface-200 flex h-full w-full flex-auto flex-col items-center justify-center gap-8 border-2 p-8 text-center md:w-[50%]"
	>
		{@render joined()}
	</Card>
{/if}
