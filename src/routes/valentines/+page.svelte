<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	type State = 'interrogating' | 'agreed' | 'location';
	let progress: State = $state('interrogating');
	let denyFactor: number = $state(1);
	let denied: boolean = $state(false);

	function triggerDenied() {
		denied = false;
		setTimeout(() => {
			denied = true;
		}, 20);
		denyFactor++;
	}
</script>

<svelte:head>
	<title>Valentines invitation | Allen 365</title>
</svelte:head>

<main class="flex items-center justify-center min-h-screen bg-pink-100">
	{#if progress === 'interrogating'}
		<div>
			<h2>Will you be my valentine?</h2>
			<img src="/valentines/dudu-flower.gif" alt="giving flower for valentines" />
			<div>
				<button
					class="bg-green-400 hover:bg-green-500"
					onclick={() => (progress = 'agreed')}
					style="font-size:{1.25 ** denyFactor}rem; padding: {0.5 ** (denyFactor - 1)}rem {2 **
						(denyFactor - 1)}rem;">Yes</button
				>
				<button class="bg-red-400 hover:bg-red-500" onclick={() => triggerDenied()}>No</button>
			</div>
		</div>
	{:else if progress === 'agreed'}
		<div>
			<h2>She said yesssss!!!!!</h2>
			<div class="flex">
				<img src="/valentines/bubu-dudu-sseeyall.gif" alt="happy dancing" />
				<img src="/valentines/huhhh.gif" alt="hugging tight" />
			</div>
			<button onclick={() => (progress = 'location')} class="bg-pink-300 hover:bg-pink-400"
				>Next</button
			>
		</div>
	{:else if progress === 'location'}
		<div>
			<h2>Let's have our date here</h2>
			<div class="flex gap-3">
				<img src="/valentines/milk-and-mocha-dance.gif" alt="pointing while dancing" />
				<!-- svelte-ignore a11y_missing_attribute -->
				<div class="embed-map-fixed">
					<div class="embed-map-container">
						<iframe
							class="embed-map-frame"
							frameborder="0"
							scrolling="no"
							marginheight="0"
							marginwidth="0"
							src="https://maps.google.com/maps?width=600&height=400&hl=en&q=kanluran%20cafe%2C%20banjo%20west&t=k&z=15&ie=UTF8&iwloc=B&output=embed"
						></iframe><a
							href="https://funclicker.org"
							style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:1px;overflow:hidden"
							>Fun Clicker</a
						>
					</div>
					<style>
						.embed-map-fixed {
							position: relative;
							text-align: right;
							width: 600px;
							height: 400px;
						}
						.embed-map-container {
							overflow: hidden;
							background: none !important;
							width: 600px;
							height: 400px;
						}
						.embed-map-frame {
							width: 600px !important;
							height: 400px !important;
						}
					</style>
				</div>
			</div>
		</div>
	{/if}
</main>
<img
	src="/valentines/sad-emoji.gif"
	id="sad-deny"
	alt="emoji na malungkot"
	class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 {denied
		? 'emoji-malungkot'
		: ''}"
/>

<style lang="postcss">
	/* @references "tailwindcss"; */
	h2 {
		text-align: center;
		font-size: 2rem;
	}
	img {
		height: 25rem;
		width: auto;
	}
	main > div {
		padding: 2.5rem;
		min-height: 60vh;
		min-width: 50vw;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		border: 4px solid var(--color-pink-500);
		box-shadow: 0 0 0.25rem var(--color-pink-500);
		border-radius: 1rem;
		gap: 1rem;
	}
	button {
		padding: 0.75rem 2rem;
		font-size: 1.25rem;
		font-weight: bold;
		border-radius: 0.5rem;
		transition: background-color 175ms;
		&:active {
			scale: 0.95;
		}
	}
	#sad-deny {
		pointer-events: none;
	}
	.emoji-malungkot {
		animation: fade-expand 0.6s ease-out;
	}
	@keyframes fade-expand {
		0% {
			opacity: 1;
		}
		100% {
			scale: 1.5;
			opacity: 0;
		}
	}
</style>
