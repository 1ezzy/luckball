<script lang="ts">
	import Badge from './Badge.svelte';

	const label = 'BALLER';
</script>

<Badge>
	<svg width="48" height="16" viewBox="0 0 48 16" class="block">
		<defs>
			<clipPath id="baller-pill">
				<rect x="0" y="0" width="48" height="16" rx="8" ry="8" />
			</clipPath>
		</defs>
		<g clip-path="url(#baller-pill)">
			<rect x="0" y="0" width="48" height="16" fill="#6d4c41" />
		</g>
		<rect
			x="0.5"
			y="0.5"
			width="47"
			height="15"
			rx="7.5"
			ry="7.5"
			fill="none"
			stroke="white"
			stroke-width="1"
		/>
		<text
			x="50%"
			y="50%"
			text-anchor="middle"
			dominant-baseline="central"
			fill="white"
			font-size="10"
			font-weight="900"
			font-family="monospace"
		>
			{label}
		</text>
	</svg>
</Badge>
