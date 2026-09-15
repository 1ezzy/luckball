<script lang="ts">
	import { Button, Checkbox, TextField } from 'svelte-ux';
	import { authClient } from '$lib/clients/auth-client';

	let username = $state('');
	let password = $state('');
	let email = $state('');
	let name = $state('');
	let rememberMe = $state(true);

	async function handleSignUp(event: SubmitEvent) {
		event.preventDefault();
		await authClient.signUp.email({
			email,
			username,
			password,
			name
		});
	}
</script>

{#snippet titleCopy()}
	<div class="flex w-full flex-col items-center justify-center gap-4 self-end">
		<h1 class="text-primary text-6xl font-bold">Luckball</h1>
		<h1 class="text-secondary text-center text-2xl">It's all about the Luck Of The Ball</h1>
	</div>
{/snippet}

{#snippet loginForm()}
	<form class="flex flex-col gap-4 self-start" onsubmit={handleSignUp}>
		<div class="grid grid-rows-2 gap-4 mb-4">
			<TextField
				classes={{ input: 'text-primary-content autofill-fix' }}
				type="email"
				label="Email"
				bind:value={email}
			/>
			<TextField
				classes={{ input: 'text-primary-content autofill-fix' }}
				type="text"
				label="Username"
				bind:value={username}
			/>
			<TextField
				classes={{ input: 'text-primary-content autofill-fix' }}
				type="password"
				label="Password"
				bind:value={password}
			/>
		</div>
		<Checkbox class="text-primary-content" bind:checked={rememberMe}>Remember me</Checkbox>
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
