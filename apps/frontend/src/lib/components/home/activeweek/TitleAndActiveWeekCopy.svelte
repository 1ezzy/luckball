<script lang="ts">
	import PageTitle from '$lib/components/shared/PageTitle.svelte';

	let { currentWeekText, weekJoined, userTeamAssignment, mainPage = true } = $props();

	const weekBegunCopy = `${currentWeekText} has begun! `;
	let subtextCopy = $derived.by(() => {
		switch (`${!!weekJoined}:${mainPage}`) {
			case 'true:true':
				return (
					weekBegunCopy +
					`You can track both teams below; you are on team <span class="text-primary font-bold">${userTeamAssignment}</span>.`
				);
			case 'true:false':
				return weekBegunCopy + `You can track both teams and their scores on the home page.`;
			case 'false:true':
				return (
					weekBegunCopy +
					`You did not join Luckball this week, you can still pick a team to root for but you will not receive any points for the week.`
				);
			case 'false:false':
				return (
					weekBegunCopy +
					`You did not join Luckball this week, you can still pick a team to root for but you will not receive any points for the week.`
				);
			default:
				return '';
		}
	});
</script>

<div class="flex w-full flex-col gap-4 text-center md:text-left 2xl:gap-8">
	<PageTitle />
	<div class="flex w-full flex-col gap-2 leading-8">
		<span>
			{@html subtextCopy}
		</span>
	</div>
</div>
