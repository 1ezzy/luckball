<script lang="ts">
	import { PUBLIC_TEAM_LOGO_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Button, Card, Form, TextField } from 'svelte-ux';

	// getting data for page
	let { data } = $props();
	const matchups = data.weekItem.events.map((week: any) => week.shortName);
	const matchupDates = data.weekItem.events.map((week: any) => week.date);
	const teams = data.weekItem.teams;

	onMount(() => {
		console.log(teams);
	});

	const weekJoined = false;
	const weekStart = false;
</script>

<div class="grid w-full flex-1 grid-cols-3">
	<div class="max-h-3xl col-span-1 flex flex-col items-center justify-between px-16 py-24">
		{#if !weekJoined}
			<Form
				class="flex w-full flex-col gap-8 text-center"
				method="post"
				action="?/joinWeek"
				on:change={(e) => (data = e.detail)}
				let:draft
			>
				<TextField
					name="displayName"
					placeholder="Enter Display Name"
					value={draft.displayName}
					on:change={(e) => {
						draft.displayName = e.detail.value;
					}}
				/>
				<Button type="submit" color="primary" variant="fill-outline">
					Join Preseason Week [weeknumber]
				</Button>
			</Form>
		{:else}
			<div class="flex w-full flex-col gap-8 text-center">
				<span>You've successfully joined Preseason Week [weeknumber]!</span>
				<span class="text-primary">Display Name: [displayname]</span>
			</div>
		{/if}
		<hr class="block h-[1px] w-full border-0 border-t-1 border-t-white" />
		<div class="flex flex-col gap-16 text-center">
			<div class="flex flex-col gap-4">
				<h2 class="mb-2 text-2xl">Record (All-Time)</h2>
				<span class="text-sm">0 wins</span>
				<span class="text-sm">0 losses</span>
				<span class="text-sm">Current win streak: 0</span>
			</div>
			<div class="flex flex-col gap-4">
				<h2 class="mb-2 text-2xl">Other Stats</h2>
				<span class="text-sm">Your Best Team: n/a</span>
				<span class="text-sm">Overall Best Team: n/a (Week 0)</span>
			</div>
		</div>
	</div>
	<div class="col-span-2 flex flex-col items-center gap-16 px-16 py-24">
		<div class="flex max-w-2xl flex-col gap-8">
			<div class="flex w-full flex-row items-center gap-12">
				<h1 class="text-primary text-6xl font-bold">Luckball</h1>
				<h1 class="mt-8 text-2xl">It's all about the Luck Of The Ball</h1>
			</div>
			<div class="flex w-full flex-col gap-8 leading-8">
				Preaseason Week [weeknumber] has not started yet. You can join the week by entering a
				display name on the left and clicking the "Join" button
			</div>
		</div>
		<div class="flex max-w-2xl flex-col gap-4">
			<h2 class="text-secondary mb-2 text-2xl">Schedule for Preaseaon Week [weeknumber]</h2>
			<Card class="h-full">
				<div
					class="grid h-full grid-cols-4 grid-rows-4 items-center justify-items-center gap-2 p-4"
				>
					{#each matchups as matchup, i}
						<div class="flex w-full flex-col gap-1">
							<div class="flex w-full flex-row items-center justify-between gap-2 px-2">
								<img
									class="h-6"
									height="32"
									src="{PUBLIC_TEAM_LOGO_URL}/{teams[i * 2]}.png"
									alt="{teams[i * 2]} logo"
								/>
								<span class="text-sm">{matchup}</span>
								<img
									class="h-6"
									src="{PUBLIC_TEAM_LOGO_URL}/{teams[i * 2 + 1]}.png"
									alt="{teams[i * 2 + 1]} logo"
								/>
							</div>
							<span class="text-center text-xs opacity-50">
								{new Date(matchupDates[i]).toLocaleString('en-us', {
									weekday: 'short',
									month: 'numeric',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								})}
							</span>
						</div>
					{/each}
				</div>
			</Card>
		</div>
	</div>
</div>
