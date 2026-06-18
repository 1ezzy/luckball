<script lang="ts">
	import { generateLosingQuote, generateWinningQuote } from '$lib/utils/quotes/quote-generators';

	let { currentWeekText, displayName, winningTeamName, userTeamName, mainPage = true } = $props();

	let won = winningTeamName === userTeamName;
	let quote = won ? generateWinningQuote() : generateLosingQuote();

	let subtextCopy = $derived.by(() => {
		switch (`${!!displayName}:${mainPage}:${won}`) {
			case 'true:true:true':
				return `<span>You won this week! You can check out the final scores below, the next round starts soon.</span> 
				<span class="text-bold text-secondary">"${quote}"</span>`;
			case 'true:true:false':
				return `<span>You lost this week. You can check out the final scores below, the next round starts soon.</span> 
				<span class="text-bold text-secondary">"${quote}"</span>`;
			case 'true:false:true':
				return `<span>You won this week! You can check out the final scores on the home page, the next round starts soon.</span> 
				<span class="text-bold text-secondary">"${quote}"</span>`;
			case 'true:false:false':
				return `<span>You lost this week. You can check out the final scores on the home page, the next round starts soon.</span> 
				<span class="text-bold text-secondary">"${quote}"</span>`;
			case 'false:true:true':
				return `${currentWeekText} has ended! Check out this week's winning team below. The next round starts soon.`;
			case 'false:true:false':
				return `${currentWeekText} has ended! Check out this week's winning team below. The next round starts soon.`;
			case 'false:false:true':
				return `${currentWeekText} has ended! Check out this week's winning team on the home page. The next round starts soon.`;
			case 'false:false:false':
				return `${currentWeekText} has ended! Check out this week's winning team on the home page. The next round starts soon.`;
			default:
				return '';
		}
	});
</script>

<div class="flex w-full flex-col gap-2 leading-8">
	{@html subtextCopy}
</div>
