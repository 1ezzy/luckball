<script lang="ts">
	let { currentWeekText, weekJoined, userTeamAssignment, mainPage = true } = $props();

	let weekBegunCopy = $derived(
		`<span class="text-secondary">${currentWeekText}</span> has begun! `
	);
	let subtextCopy = $derived.by(() => {
		switch (`${!!weekJoined}:${mainPage}`) {
			case 'true:true':
				return (
					`<span>` +
					weekBegunCopy +
					`You can track both teams below; you are on team <span class="text-primary font-bold">${userTeamAssignment}</span>.</span>`
				);
			case 'true:false':
				return (
					`<span>` +
					weekBegunCopy +
					`You can track both teams and their scores on the home page.</span>`
				);
			case 'false:true':
				return (
					`<span>` +
					weekBegunCopy +
					`You did not join Luckball this week, you can still pick a team to root for but you will not receive any points for the week.</span>`
				);
			case 'false:false':
				return (
					`<span>` +
					weekBegunCopy +
					`You did not join Luckball this week, you can still pick a team to root for but you will not receive any points for the week.</span>`
				);
			default:
				return '';
		}
	});
</script>

<div class="flex w-full flex-col gap-2 leading-8 text-fluid-base">
	{@html subtextCopy}
</div>
