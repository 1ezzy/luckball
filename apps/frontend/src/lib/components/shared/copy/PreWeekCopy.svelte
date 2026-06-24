<script lang="ts">
	let { currentWeekText, weekJoined, mainPage = true } = $props();

	let subtextCopy = $derived.by(() => {
		switch (`${!!weekJoined}:${mainPage}`) {
			case 'true:true':
				return 'You have already joined this week.';
			case 'true:false':
				return 'You have already joined this week, check out the home page for additional information.';
			case 'false:true':
				return 'You can join the week by entering a display name and clicking the "Join" button.';
			case 'false:false':
				return 'You can join on the home page.';
			default:
				return '';
		}
	});
</script>

<div class="flex w-full flex-col gap-8 leading-8">
	{currentWeekText} has not started yet. {subtextCopy}
</div>
