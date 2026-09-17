<script lang="ts">
	import { Button, TextField } from 'svelte-ux';
	import { enhance } from '$app/forms';

	let username = $state('');
	let password = $state('');
	let email = $state('');
</script>

{#snippet titleCopy()}
	<div class="flex w-full flex-col items-center justify-center gap-4 self-end">
		<h1 class="text-primary text-6xl font-bold">Luckball</h1>
		<h1 class="text-secondary text-center text-2xl">It's all about the Luck Of The Ball</h1>
	</div>
{/snippet}

{#snippet loginForm()}
	<form
		use:enhance
		class="flex flex-col gap-4 self-start"
		action="?/signUp"
		method="POST"
		autocomplete="off"
	>
		<div class="grid grid-rows-2 gap-4 mb-4">
			<TextField
				classes={{ input: 'text-primary-content autofill-fix' }}
				type="email"
				label="Email"
				name="email"
				bind:value={email}
			/>
			<TextField
				classes={{ input: 'text-primary-content autofill-fix' }}
				type="text"
				label="Username"
				name="username"
				bind:value={username}
			/>
			<TextField
				classes={{ input: 'text-primary-content autofill-fix' }}
				type="password"
				label="Password"
				name="password"
				bind:value={password}
			/>
		</div>
		<Button class="text-white" type="submit" variant="fill" color="primary">Sign Up</Button>
		<span class="text-fluid-xs text-primary-content text-center">
			Already have an account? <a class="underline text-primary" href="/login">Log in here</a>
		</span>
	</form>
{/snippet}

<div class="grid w-full h-full gap-16 items-center justify-items-center p-8">
	{@render titleCopy()}
	{@render loginForm()}
</div>

<style>
	:global(.autofill-fix:-webkit-autofill),
	:global(.autofill-fix:-webkit-autofill:hover),
	:global(.autofill-fix:-webkit-autofill:focus),
	:global(.autofill-fix:-webkit-autofill:active) {
		-webkit-box-shadow: 0 0 0 1000px var(--color-surface-100) inset;
		-webkit-text-fill-color: var(--color-primary-content);
		caret-color: var(--color-primary-content);
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
