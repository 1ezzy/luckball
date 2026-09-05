<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Card, TextField } from 'svelte-ux';

	let { weekJoined, currentWeekText, displayName, prevDisplayName } = $props();

	let joinLoading = $state(false);
	let editCompleteLoading = $state(false);

	let modifiedUsername = $derived(prevDisplayName);
	let editingUsername = $state(false);
</script>

{#snippet joined()}
	<span class="text-secondary text-fluid-lg">You've Successfully Joined {currentWeekText}</span>
	<div class="flex w-4/5 flex-col items-center justify-center gap-8">
		{#if !editingUsername}
			<div
				class="bg-primary-200 w-full rounded-lg flex items-center justify-center border-primary-400 border-2 py-2"
			>
				<span class="text-primary-content text-fluid-base">
					Display Name: <span class="text-primary font-bold">{displayName}</span>
				</span>
			</div>
		{:else}
			<TextField
				classes={{
					container: 'w-full border-2 rounded-lg',
					root: 'w-full',
					input: 'text-fluid-base!'
				}}
				placeholder="Enter Display Name"
				bind:value={modifiedUsername}
			/>
		{/if}
		<div class="grid grid-cols-2 gap-4 w-full">
			{#if !editingUsername}
				<form class="w-full" method="post" action="?/leaveWeek" use:enhance>
					<Button class="w-full" type="submit" variant="fill" color="danger">Leave Week</Button>
				</form>
			{:else}
				<Button variant="fill" color="warning" onclick={() => (editingUsername = !editingUsername)}>
					Cancel
				</Button>
			{/if}

			{#if !editingUsername}
				<Button variant="fill" color="info" onclick={() => (editingUsername = !editingUsername)}>
					Update Name
				</Button>
			{:else}
				<form
					class="w-full"
					method="post"
					action="?/updateUsername"
					id="updateUsername"
					use:enhance={({ formData }) => {
						formData.set('modifiedUsername', modifiedUsername);

						editingUsername = false;
						editCompleteLoading = true;
						return async ({ update }) => {
							await update();
							editCompleteLoading = false;
						};
					}}
				>
					<Button class="w-full" type="submit" variant="fill" color="success">Confirm</Button>
				</form>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet joinForm()}
	<h3 class="text-secondary text-fluid-lg">Join {currentWeekText}</h3>
	<form
		class="flex w-4/5 flex-col items-center justify-center gap-8"
		method="post"
		action="?/joinWeek"
		use:enhance={() => {
			joinLoading = true;
			return async ({ update }) => {
				await update();
				joinLoading = false;
			};
		}}
	>
		<TextField
			classes={{
				container: 'w-full border-2 rounded-lg',
				root: 'w-full',
				input: 'text-fluid-base!'
			}}
			name="displayName"
			placeholder="Enter Display Name"
			bind:value={prevDisplayName}
		/>
		<Button type="submit" color="success" variant="fill" class="w-full" loading={joinLoading}>
			Join Week
		</Button>
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
