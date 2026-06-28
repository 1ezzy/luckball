<script lang="ts">
	let { currentWeekText, weekJoined, mainPage = true } = $props();

	let subtextCopy = $derived.by(() => {
		switch (`${!!weekJoined}:${mainPage}`) {
			case 'true:true':
				return '<span>You have already joined this week.</span>';
			case 'true:false':
				return '<span>You have already joined this week, check out the home page for additional information.</span>';
			case 'false:true':
				return '<span>You can join the week by entering a display name and clicking the "Join" button.</span>';
			case 'false:false':
				return '<span>You can join on the home page.</span>';
			default:
				return '';
		}
	});
</script>

<div class="flex w-full flex-col gap-8 leading-8 text-fluid-base">
	{currentWeekText} has not started yet. {subtextCopy}
</div>
