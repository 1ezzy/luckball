<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { Card } from 'svelte-ux';

	let { teamPlayerData, displayName } = $props();
</script>

<div class="hidden w-full flex-1 lg:block">
	<div class="flex h-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">{teamPlayerData.name}</h2>
		<Card class="flex h-full flex-col justify-start gap-4 p-4">
			<div class="flex flex-col gap-1">
				<h3 class="text-accent">Teams</h3>
				<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
				<div class="grid grid-cols-4 gap-2">
					{#each teamPlayerData.nflTeams as team}
						<div class="col-span-1 flex flex-row gap-2 p-2">
							<img
								class="h-6"
								height="32"
								src="{PUBLIC_TEAM_LOGO_URL}/{team}.png"
								alt="{team} logo"
							/>
							<span>{team}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<h3 class="text-accent">Players</h3>
				<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
				<div class="grid grid-cols-4 gap-2">
					{#each teamPlayerData.usernames as player}
						<span class="col-span-1 p-2" class:text-primary={player === displayName}>
							{player}
						</span>
					{/each}
				</div>
			</div>
		</Card>
	</div>
</div>
<div class="hidden md:block lg:hidden">
	<div class="flex h-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">{teamPlayerData.name}</h2>
		<Card class="flex h-full flex-col justify-start gap-4  p-4">
			<div class="flex flex-col gap-1">
				<h3 class="text-accent">Teams</h3>
				<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
				<div class="grid grid-cols-3 gap-2">
					{#each teamPlayerData.nflTeams as team}
						<div class="col-span-1 flex flex-row gap-2 p-2">
							<img
								class="h-6"
								height="32"
								src="{PUBLIC_TEAM_LOGO_URL}/{team}.png"
								alt="{team} logo"
							/>
							<span>{team}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<h3 class="text-accent">Players</h3>
				<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
				<div class="grid grid-cols-2 gap-2">
					{#each teamPlayerData.usernames as player}
						<span class="col-span-1 p-2" class:text-primary={player === displayName}>
							{player}
						</span>
					{/each}
				</div>
			</div>
		</Card>
	</div>
</div>
<div class="block md:hidden">
	<div class="flex h-full flex-col gap-4">
		<h2 class="text-secondary mb-2 text-2xl">{teamPlayerData.name}</h2>
		<Card class="flex h-full flex-col justify-start gap-4 p-4">
			<div class="flex flex-col gap-1">
				<h3 class="text-accent">Teams</h3>
				<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
				<div class="grid grid-cols-3 gap-2">
					{#each teamPlayerData.nflTeams as team}
						<div class="col-span-1 flex flex-row gap-2 p-2">
							<img
								class="h-6"
								height="32"
								src="{PUBLIC_TEAM_LOGO_URL}/{team}.png"
								alt="{team} logo"
							/>
							<span>{team}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<h3 class="text-accent">Players</h3>
				<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
				<div class="grid grid-cols-2 gap-2">
					{#each teamPlayerData.usernames as player}
						<span class="col-span-1 p-2" class:text-primary={player === displayName}>
							{player}
						</span>
					{/each}
				</div>
			</div>
		</Card>
	</div>
</div>
