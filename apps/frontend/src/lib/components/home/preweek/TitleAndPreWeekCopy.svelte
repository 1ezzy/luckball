<script lang="ts">
	import HomepageTitle from '$lib/components/home/HomepageTitle.svelte';
	import PreWeekCopy from '$lib/components/shared/copy/PreWeekCopy.svelte';

	let { currentWeekText, weekJoined } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<HomepageTitle />
	<PreWeekCopy {currentWeekText} {weekJoined} />
</div>
