<script lang="ts">
	interface Props {
		children: import('svelte').Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<button {...props}>
	{@render children?.()}
</button>

<style>
	/* I'm bad at css, I just let chatgpt make this */
	button {
		@apply relative inline-block px-8 py-3 font-bold text-white uppercase transition-all duration-200 transform rounded-lg shadow-lg hover:shadow-xl active:shadow-md;
		background: linear-gradient(145deg, #ff6fd8, #3813c2);
	}

	/* Create a gradient background animation */
	button:before {
		content: '';
		@apply absolute inset-0 rounded-lg opacity-75 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500;
		background-size: 200%;
		z-index: -1;
		transition: transform 0.4s ease;
	}

	button:hover::before {
		transform: scale(1.1); /* Subtle zoom */
	}

	/* Hover Glow */
	button:hover {
		box-shadow:
			0 10px 15px rgba(255, 111, 216, 0.4),
			0 4px 6px rgba(56, 19, 194, 0.4);
		transform: translateY(-2px); /* Lift up on hover */
	}

	/* Active (Click) Effect */
	button:active {
		transform: translateY(1px) scale(0.98);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	/* Add a shimmering effect */
	button::after {
		content: '';
		@apply absolute inset-0 rounded-lg;
		background: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0.4) 25%,
			rgba(255, 255, 255, 0) 50%
		);
		z-index: -1;
		background-size: 200%;
		animation: shimmer 2s infinite linear;
	}

	/* Shimmer Animation */
	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>
