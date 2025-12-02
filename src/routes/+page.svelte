<script lang="ts">
	import NumberCountdown from '$lib/components/NumberCountdown.svelte';
	import { onMount } from 'svelte';

	const countdownData = $state({
		days: '00',
		hours: '00',
		minutes: '00',
		seconds: '00'
	});

	function updateCountdown() {
		const SECONDS = 1000,
			MINUTES = SECONDS * 60,
			HOURS = MINUTES * 60,
			DAYS = HOURS * 24;
		const difference = Date.parse('2025-12-14T16:00:00+00:00') - Date.now();
		countdownData.days = Math.floor(difference / DAYS).toString();
		countdownData.hours = Math.floor((difference % DAYS) / HOURS).toString();
		countdownData.minutes = Math.floor(((difference % DAYS) % HOURS) / MINUTES).toString();
		countdownData.seconds = Math.floor(
			(((difference % DAYS) % HOURS) % MINUTES) / SECONDS
		).toString();
	}
	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<!-- <div class="h-[200vh] px-2 py-32">
	<div class="h-full mx-auto"></div>
	<div class=" h-full flex gap-5 bigass-container">
		<div class="bg-orange-400 w-1/2 h-full gallery-pictures"></div>
		<h1 class="text-5xl font-bold gallery-text fixed top-1/2 left-1/2">Lorem ipsum dolor</h1>
	</div>	

	<div class="h-full mx-auto"></div>
</div> -->
<div class="max-w-min mx-auto h-screen flex justify-center flex-col gap-12">
	<h1 class="text-6xl text-center">Coming soon... ready yourself in</h1>
	<div class="flex gap-20">
		<NumberCountdown type="Days" value={countdownData.days} />
		<NumberCountdown type="Hours" value={countdownData.hours} />
		<NumberCountdown type="Minutes" value={countdownData.minutes} />
		<NumberCountdown type="Seconds" value={countdownData.seconds} />
	</div>
</div>
