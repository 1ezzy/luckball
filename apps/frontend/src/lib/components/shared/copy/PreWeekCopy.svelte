<script lang="ts">
	let { currentWeekText, weekJoined, mainPage = true } = $props();

	let subtextCopy = $derived.by(() => {
		switch (`${!!weekJoined}:${mainPage}`) {
			case 'true:true':
				return `${currentWeekText} has not started yet. <span>You have already joined this week.</span>`;
			case 'true:false':
				return `${currentWeekText} has not started yet. <span>You have already joined this week, check out the home page for additional information.</span>`;
			case 'false:true':
				return `${currentWeekText} has not started yet. <span>You can join the week by entering a display name and clicking the "Join" button.</span>`;
			case 'false:false':
				return `${currentWeekText} has not started yet. <span>You can join on the home page.</span>`;
			default:
				return '';
		}
	});
</script>

<div class="flex w-full flex-col gap-2 leading-8 text-fluid-base">
	{@html subtextCopy}
</div>
