<script lang="ts">
	import HomepageTitle from '$lib/components/home/HomepageTitle.svelte';
	import ActiveWeekCopy from '$lib/components/shared/copy/ActiveWeekCopy.svelte';

	let { currentWeekText, weekJoined, userTeamAssignment } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<HomepageTitle />
	<ActiveWeekCopy {currentWeekText} {weekJoined} {userTeamAssignment} />
</div>
