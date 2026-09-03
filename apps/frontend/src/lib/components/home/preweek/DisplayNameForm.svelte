<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Card, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName, prevDisplayName } = $props();

	let loading = $state(false);
</script>

{#snippet joined()}
	<span class="text-secondary text-fluid-lg">You've successfully joined {currentWeekText}!</span>
	<div class="flex w-4/5 flex-col items-center justify-center gap-8">
		<span class="text-primary-content text-fluid-base h-10">
			Display Name: <span class="text-primary font-bold">{displayName}</span>
		</span>
		<div class="grid grid-cols-2 gap-4 w-full">
			<Button variant="fill" color="info">Update Name</Button>
			<form class="w-full" method="post" action="?/leaveWeek" use:enhance>
				<Button class="w-full" type="submit" variant="fill" color="danger">Leave Week</Button>
			</form>
		</div>
	</div>
{/snippet}

{#snippet joinForm()}
	<h3 class="text-secondary text-fluid-lg">Join {currentWeekText} now!</h3>
	<form
		class="flex w-4/5 flex-col items-center justify-center gap-8"
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
		<TextField
			classes={{ container: 'border-2', root: 'w-full' }}
			name="displayName"
			placeholder="Enter Display Name"
			bind:value={prevDisplayName}
		/>
		<Button type="submit" color="success" variant="fill" class="w-full" {loading}>Join Week</Button>
	</form>
{/snippet}

{#if !weekJoined}
	<Card class="page-card! grid-rows-[auto_1fr]">
		{@render joinForm()}
	</Card>
{:else}
	<Card class="page-card! grid-rows-[auto_1fr]">
		{@render joined()}
	</Card>
{/if}
