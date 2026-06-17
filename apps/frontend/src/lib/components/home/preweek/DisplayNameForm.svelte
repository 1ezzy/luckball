<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Card, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName, prevDisplayName } = $props();

	let loading = $state(false);

	const cardClasses =
		'bg-surface-200 flex w-fullflex-col items-center justify-center gap-8 border-2 p-8 text-center md:w-[50%] rounded-lg';
</script>

{#snippet joined()}
	<div class="flex h-full w-full flex-col justify-between text-center">
		<span class="text-fluid-base">You've successfully joined {currentWeekText}!</span>
		<span class="text-primary text-fluid-base">Display Name: {displayName}</span>
		<div class="flex w-full flex-col gap-4 text-center">
			<Button variant="fill" color="info">Update Name</Button>
			<form class="w-full" method="post" action="?/leaveWeek" use:enhance>
				<Button class="w-full" type="submit" variant="fill" color="danger">Leave Week</Button>
			</form>
		</div>
	</div>
{/snippet}

{#snippet joinForm()}
	<form
		class="flex h-full w-full flex-col justify-between md:w-[67%]"
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
			<Button type="submit" color="success" variant="fill" {loading}>Join Week</Button>
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
