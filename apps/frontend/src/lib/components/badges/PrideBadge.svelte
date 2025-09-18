<script lang="ts">
	import Badge from './Badge.svelte';

	const label = 'PRIDE';
</script>

<Badge>
	<svg width="48" height="16" viewBox="0 0 48 16" class="block">
		<defs>
			<clipPath id="pill">
				<rect x="0" y="0" width="48" height="16" rx="8" ry="8" />
			</clipPath>
			<filter id="text-outline">
				<feMorphology in="SourceAlpha" operator="dilate" radius="0.5" result="dilated" />
				<feFlood flood-color="black" result="color" />
				<feComposite in="color" in2="dilated" operator="in" result="outline" />
				<feMerge>
					<feMergeNode in="outline" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		<g clip-path="url(#pill)">
			<rect x="0" y="0" width="8" height="16" fill="#E40303" />
			<rect x="8" y="0" width="8" height="16" fill="#FF8C00" />
			<rect x="16" y="0" width="8" height="16" fill="#FFED00" />
			<rect x="24" y="0" width="8" height="16" fill="#008026" />
			<rect x="32" y="0" width="8" height="16" fill="#004DFF" />
			<rect x="40" y="0" width="8" height="16" fill="#750787" />
		</g>
		<text
			filter="url(#text-outline)"
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
