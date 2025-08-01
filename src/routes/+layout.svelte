<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { Icon } from 'svelte-ux';
	import { faCalendar, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
	import './app.css';

	const desktopView = new MediaQuery('min-width: 768px');

	let { children } = $props();
</script>

<svelte:head>
	<title>Happidrafters</title>
	<meta name="happidrafters" content="Fantasy CS2 hosted by Ceej and Ezzy" />
</svelte:head>
