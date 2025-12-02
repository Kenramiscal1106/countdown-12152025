<script lang="ts">
	interface Props {
		type: string;
		value: string;
	}
	const { type, value }: Props = $props();
</script>

<div class="flex flex-col items-center gap-[2vw]">
	<div class="px-[2vw] countdown font-bold">{(value.length === 1 ? '0' : '') + value}</div>
	<h2 class="text-[3vw]">{type}</h2>
</div>

<style>
	.countdown {
		border-radius: 2vw;
		border: 0.25rem solid #000;
		background: #fff;
		box-shadow: 0.5vw 0.5vw 0 0 #000;
		display: flex;
		font-size: 10vw;
		color: #000;
		font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
	}
</style>
