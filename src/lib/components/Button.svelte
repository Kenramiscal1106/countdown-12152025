<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & Partial<Pick<HTMLButtonAttributes, 'onclick' | 'onmouseover'>>;
	const { children, class: className, ...props }: Props = $props();
</script>

<button
	class="shadow-neu border-4 text-2xl py-4 rounded-2xl font-bold w-full max-w-96 active:shadow-neu-retract active:translate-y-1 transition-all duration-100 flex gap-4 justify-center {className ??
		''} "
	{...props}>{@render children()}</button
>
