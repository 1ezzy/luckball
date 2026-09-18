<script lang="ts">
	import { ToggleGroup, ToggleOption } from 'svelte-ux';

	let { header, children, selectedView = $bindable() } = $props();
</script>

<div class="flex w-full flex-col gap-4">
	<!-- desktop view -->
	<h3 class="hidden md:block text-secondary text-fluid-sm">{header}</h3>

	<!-- mobile view -->
	<div class="md:hidden flex flex-row gap-2 justify-between items-center">
		<span class="text-fluid-sm text-primary-content/40">Select View</span>
		<ToggleGroup size="sm" variant="fill-light" gap={true} rounded="full" bind:value={selectedView}>
			<ToggleOption value="teams">Teams</ToggleOption>
			<ToggleOption value="players">Players</ToggleOption>
		</ToggleGroup>
	</div>
	<hr class="border-t-primary-content block h-px w-full border-0 border-t-2" />
	{@render children()}
</div>
