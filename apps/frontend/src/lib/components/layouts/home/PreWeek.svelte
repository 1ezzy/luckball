<script lang="ts">
	import DisplayNameForm from '$lib/components/home/preweek/DisplayNameForm.svelte';
	import TitleAndPreWeekCopy from '$lib/components/home/preweek/TitleAndPreWeekCopy.svelte';
	import PageShell from '$lib/components/shared/PageShell.svelte';

	let { currentWeekText, displayName, weekJoined } = $props();
</script>

<div class="hidden h-[calc(100vh-4rem)] lg:block">
	<PageShell>
		<TitleAndPreWeekCopy {currentWeekText} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<DisplayNameForm {weekJoined} {currentWeekText} {displayName} />
	</PageShell>
</div>
<div class="hidden h-[calc(100vh-4rem)] md:block lg:hidden">
	<PageShell>
		<TitleAndPreWeekCopy {currentWeekText} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<DisplayNameForm {weekJoined} {currentWeekText} {displayName} />
	</PageShell>
</div>
<div class="block md:hidden">
	<PageShell>
		<TitleAndPreWeekCopy {currentWeekText} />
		<hr class="border-t-1 block h-[1px] w-full border-0 border-t-white" />
		<DisplayNameForm {weekJoined} {currentWeekText} {displayName} />
	</PageShell>
</div>
