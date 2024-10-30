<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	let { children, data } = $props();
</script>

<div class="container mx-auto max-w-5xl">
	<div class="flex flex-col md:flex-row">
		<div
			class="overflow-y-scroll px-4 mx-2 h-36 border-b-2 md:py-4 md:w-64 md:h-screen md:border-r-2 scrollbar-transparent"
		>
			<h3 class="my-4 text-2xl font-bold">Pages</h3>
			<ul>
				<li>
					<a
						href="/"
						class="capitalize hover:text-orange-700 hover:underline"
						class:text-orange-600={$page.url.pathname === `/`}
						class:underline={$page.url.pathname === `/`}>Home</a
					>
				</li>
				{#each data.slugList as slugItem}
					<li>
						<a
							href="/{slugItem.slug}"
							class="capitalize hover:text-orange-700 hover:underline"
							class:text-orange-600={$page.url.pathname === `/${slugItem.slug}`}
							class:underline={$page.url.pathname === `/${slugItem.slug}`}
							>{slugItem.slug.replace('-', ' ')}</a
						>
					</li>
				{/each}
			</ul>
		</div>
		<div class="overflow-y-scroll w-full md:h-screen scrollbar-transparent">
			<div class="my-4 mx-4">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar-transparent {
		scrollbar-width: thin;
		scrollbar-color: #0000004d transparent;
	}
</style>
