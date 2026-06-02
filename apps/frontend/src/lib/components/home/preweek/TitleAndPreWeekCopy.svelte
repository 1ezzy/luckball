<script lang="ts">
	import PageTitle from '$lib/components/shared/PageTitle.svelte';

	let { currentWeekText, mainPage = true } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<PageTitle />
	<div class="flex w-full flex-col gap-8 leading-8">
		{currentWeekText} has not started yet. {mainPage
			? 'You can join the week by entering a display name and clicking the "Join" button.'
			: 'You can join on the home page.'}
	</div>
</div>
