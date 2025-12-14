<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NumberCountdown from '$lib/components/NumberCountdown.svelte';
	import { animate, createTimeline, onScroll, splitText, stagger } from 'animejs';
	import { onMount } from 'svelte';
	const { data } = $props();
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
		// console.log(diff);
		countdownData.days = Math.floor(difference / DAYS).toString();
		countdownData.hours = Math.floor((difference % DAYS) / HOURS).toString();
		countdownData.minutes = Math.floor((difference % HOURS) / MINUTES).toString();
		countdownData.seconds = Math.floor((difference % MINUTES) / SECONDS).toString();
	}
	let accepted = $state(false);
	onMount(() => {
		window.scrollTo({
			top: 0
		});
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		const { chars: timerChar } = splitText('.anime-timer-title', {
			words: { wrap: 'visible' },
			chars: true
		});
		createTimeline()
			.add('.anime-timer', {
				textContent: [0, 365],
				duration: 4000,
				modifier: (value) => Math.floor(value),
				ease: 'inOutCirc'
			})
			.add(timerChar, {
				duration: 300,
				color: ['black', 'gray', 'black'],
				delay: stagger(50),
				ease: 'inOutSine'
			})
			.add(['.anime-season', '.anime-subheading'], {
				y: [-4, 0],
				duration: 175,
				opacity: [0, 1],
				ease: 'inOutSine',
				delay: stagger(300)
			})
			.add('.anime-intro-button', {
				y: [-16, 0],
				duration: 200,
				opacity: [0, 1],
				ease: 'inOutSine'
			});
		onScroll({
			target: '.anime-scroll',
			container: document.body,
			enter: 'top+=100 top',
			leave: 'bottom bottom',
			onEnter() {
				animate(['.anime-scrolltext > *'], {
					opacity: [0, 1],
					duration: 175,
					delay: stagger(100)
				});
				animate('.anime-gradient', {
					opacity: [0, 1],
					duration: 175
				});
			},
			onLeave() {
				animate(['.anime-scrolltext > *'], {
					opacity: [1, 0],
					duration: 175,
					delay: stagger(100)
				});
				animate('.anime-gradient', {
					opacity: [1, 0],
					duration: 175
				});
			}
		});
		createTimeline({
			autoplay: onScroll({
				target: '.anime-loading-final',
				container: document.body
			})
		})
			.add('.anime-loading-final > *', {
				opacity: [0, 1],
				delay: stagger(1500),
				duration: 175
			})
			.add('.anime-season', {
				textContent: [0, 100, '∞'],
				duration: 4000,
				ease: 'inOutCirc',
				modifier: (value) => {
					if (typeof value === 'number') {
						return Math.floor(value);
					}
					return value;
				}
			})
			.add('.anime-choice > *', {
				opacity: [0, 1],
				y: [16, -4, 0],
				ease: 'inOutCirc',
				duration: 300,
				delay: stagger(500)
			});
		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Coming Soon | 365 days of Allen</title>
</svelte:head>
<!-- <div class=" h-screen flex justify-center flex-col gap-[2vw] absolute w-screen">
	<h1 class="text-[4vw] text-center">Coming soon... ready yourself in</h1>
	<div class="flex gap-[2vw] justify-center">
		<NumberCountdown type="Days" value={countdownData.days} />
		<NumberCountdown type="Hours" value={countdownData.hours} />
		<NumberCountdown type="Minutes" value={countdownData.minutes} />
		<NumberCountdown type="Seconds" value={countdownData.seconds} />
	</div>
</div> -->

<div
	class="w-screen h-screen bg-intro flex justify-center items-center flex-col gap-10 z-20 anime-exit-stagger absolute"
>
	<div class="flex flex-col text-center">
		<h1 class="text-6xl">
			<span class="anime-timer">000</span> <span class="anime-timer-title">days of Allen</span>
		</h1>
		<h2 class="text-2xl anime-season opacity-0">Season 2</h2>
		<p class="font-medium text-xl opacity-0 anime-subheading max-w-xl">
			A second year with lots of twists and turns, but with you, everything will be alright.
		</p>
	</div>

	<Button
		class="bg-intro-button opacity-0 anime-intro-button"
		onclick={() => {
			animate(['.anime-exit-stagger > *', '.anime-exit-stagger'], {
				x: [0, '-100vw'],
				opacity: [1, 0],
				ease: 'inOutSine',
				duration: 400,
				delay: stagger(200),
				onComplete: () => {
					document.body.classList.remove('overflow-y-hidden');
				}
			});
		}}
		>Get Started<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6.6665 16H25.3332M25.3332 16L15.9998 6.66667M25.3332 16L15.9998 25.3333"
				stroke="black"
				stroke-width="2.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</Button>
</div>

<div class="w-screen min-h-screen bg-white">
	<div class="flex flex-col w-1/2 items-center gap-11 py-6 px-3 anime-scroll">
		{#each data.sourceList as src}
			<div class="max-w-96 border-4 border-black rounded-2xl overflow-hidden shadow-neu-oblique">
				<img {src} class="w-full h-auto" alt="allen amante with Ken" />
			</div>
		{/each}
	</div>
	<div
		class="anime-gradient fixed top-0 left-0 w-1/2 bg-linear-to-b from-white/70 to-white/0 h-1/6"
	></div>
	<div
		class="anime-gradient fixed bottom-0 left-0 w-1/2 bg-linear-to-t from-white/70 to-white/0 h-1/6"
	></div>
	<div class="fixed top-1/2 left-1/2 -translate-y-1/2 w-1/2 px-5 max-w-xl anime-scrolltext">
		<h2 class="text-6xl">A year has passed...</h2>
		<h3 class="text-2xl mb-4">with the same feelings for you</h3>
		<quote class="text-lg"
			>You are the moonlight of my life... Every night, givin' all my love to you. My beating heart
			belongs to you.
			<br />
			-Green day
		</quote>
	</div>
</div>

<div class="w-screen min-h-screen py-12 bg-second-panel relative">
	<h2 class="text-5xl font-bold text-center">This year alone, we had...</h2>
	<div class="flex gap-24 justify-center items-center">
		<img
			src="/image-memes/vc.png"
			alt="cat video call"
			class="h-[calc(100vh-12rem)] w-auto mt-5 shadow-neu-oblique rounded-3xl border-4"
		/>
		<div>
			<h3 class="text-4xl font-bold">480+ hours</h3>
			<h4 class="text-3xl font-medium">video call</h4>
			<p>Could be more or less</p>
		</div>
	</div>
</div>
<div class="w-screen h-screen bg-third-panel relative flex justify-center items-center gap-24">
	<div>
		<img
			src="/image-memes/smelling-armpit.gif"
			alt="a meme where I'm smelling ur armpit"
			class="max-h-[500px] rounded-2xl border-4 shadow-neu-oblique mb-4"
		/>
		<div class="flex flex-col items-center">
			<h3 class="text-4xl font-bold">1000+</h3>
			<p class="text-2xl">I love you's</p>
		</div>
	</div>
	<div>
		<img
			src="/collage.png"
			alt="a stitch-up of our time with each other"
			class="max-h-[500px] rounded-2xl border-4 shadow-neu-oblique mb-4"
		/>
		<div class="flex flex-col items-center">
			<h3 class="text-4xl font-bold">100+ hours</h3>
			<p class="text-2xl">f2f meetings</p>
		</div>
	</div>
</div>
<div class="w-screen h-screen bg-fourth-panel absolute z-50 flex justify-center items-center">
	<div class="text-center">
		<div class="anime-loading-final">
			<h3 class="text-2xl font-bold">All of that, and still...</h3>
			<h4 class="text-3xl font-bold">I want to be with you</h4>
			<h2 class="text-5xl font-bold mb-4">For Season <span class="anime-season">00</span></h2>
		</div>
		<div class="anime-choice">
			<p class="text-xl font-medium opacity-0">So Princess Allen, what do you say?</p>
			<Button
				class="text-xl bg-[#AFFFC3] opacity-0"
				onclick={() => {
					animate('body *', {
						opacity: [1, 0],
						x: [0, '-100%'],
						onComplete: () => (accepted = true)
					});
				}}>I wanna join the next season</Button
			>
			<br />
			<Button
				class="text-xl px-7 bg-white opacity-0"
				onmouseover={(e) => {
					const el = e.currentTarget;
					const { width, height } = el.getBoundingClientRect();
					el.style.position = 'absolute';
					el.style.top = `${Math.floor(Math.random() * window.innerHeight) - height / 2}px`;
					el.style.left = `${Math.floor(Math.random() * window.innerWidth) - width / 2}px`;
				}}>I'm having doubts, let me think about it...</Button
			>
		</div>
	</div>
</div>
{#if accepted}
	<div class="h-screen w-screen flex flex-col items-center justify-center gap-4 no-close">
		<h2 class="text-5xl font-bold">Thank you hehe, here's flower for youuuu</h2>
		<img src="/image-memes/cat-smug.png" alt="cat-smug" />
	</div>
{/if}

<style>
	.anime-loading-final > * {
		opacity: 0;
	}
</style>
