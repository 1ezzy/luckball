<script lang="ts">
	import { authClient } from '$lib/clients/auth-client';
	import { Button } from 'svelte-ux';
	const session = authClient.useSession();
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	{#if $session.data}
		<div>
			<p>
				{$session?.data?.user.name}
			</p>
			<button
				on:click={async () => {
					await authClient.signOut();
				}}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			<Button
				variant="fill"
				on:click={async () => {
					await authClient.signIn.social({
						provider: 'discord'
					});
				}}
			>
				Continue with Discord
			</Button>
			<Button
				variant="fill"
				on:click={async () => {
					await authClient.signIn.social({
						provider: 'google'
					});
				}}
			>
				Continue with Google
			</Button>
		</div>
	{/if}
</div>
