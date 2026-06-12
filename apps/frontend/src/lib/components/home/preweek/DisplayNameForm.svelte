<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Card, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName, prevDisplayName } = $props();

	let loading = $state(false);

	const cardClasses =
		'bg-surface-200 flex w-fullflex-col items-center justify-center gap-8 border-2 p-8 text-center md:w-[50%] rounded-xl';
</script>

{#snippet joined()}
	<div class="flex w-full flex-col gap-8 text-center">
		<span class="text-fluid-base">You've successfully joined {currentWeekText}!</span>
		<span class="text-primary text-fluid-base">Display Name: {displayName}</span>
	</div>
{/snippet}

{#snippet joinForm()}
	<form
		class="flex w-full flex-col gap-16 md:w-[67%]"
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
		<h3 class="text-secondary text-fluid-xl">Join {currentWeekText} now!</h3>
		<div class="flex flex-col gap-8">
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
		</div>
	</form>
{/snippet}

{#if !weekJoined}
	<Card class={cardClasses}>
		{@render joinForm()}
	</Card>
{:else}
	<Card class={cardClasses}>
		{@render joined()}
	</Card>
{/if}
