<script lang="ts">
	import HomepageTitle from '$lib/components/home/HomepageTitle.svelte';
	import PostWeekCopy from '$lib/components/shared/copy/PostWeekCopy.svelte';

	let { currentWeekText, displayName, winningTeamName, userTeamName } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<HomepageTitle />
	<PostWeekCopy {currentWeekText} {displayName} {winningTeamName} {userTeamName} />
</div>
