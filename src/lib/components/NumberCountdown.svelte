<script lang="ts">
	interface Props {
		type: string;
		value: string;
	}
	const { type, value }: Props = $props();
</script>

<div class="flex flex-col items-center gap-12">
	<div class="px-6 countdown font-bold">{value}</div>
	<h2 class="text-5xl">{type}</h2>
</div>

<style>
	.countdown {
		border-radius: 1.5rem;
		border: 0.25rem solid #000;
		background: #fff;
		box-shadow: 0.5rem 0.5rem 0 0 #000;
		display: flex;
		font-size: 10vw;
		color: #000;
		font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
	}
</style>
