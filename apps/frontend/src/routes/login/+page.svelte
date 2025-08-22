<script lang="ts">
	import { authClient } from '$lib/clients/auth-client';
	const session = authClient.useSession();
</script>

<div>
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
		<button
			on:click={async () => {
				await authClient.signIn.social({
					provider: 'discord'
				});
			}}
		>
			Continue with Discord
		</button>
	{/if}
</div>
