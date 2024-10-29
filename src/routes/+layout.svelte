<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	let { children, data } = $props();
	console.log($page.url.pathname);
</script>

<div class="container mx-auto max-w-5xl">
	<div class="flex flex-col md:flex-row">
		<div
			class="overflow-y-scroll py-4 px-4 mx-2 md:w-56 md:h-screen md:border-r-2"
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
		<div class="overflow-y-scroll w-full h-screen">
			<div class="my-4 mx-4">
				{@render children()}
			</div>
		</div>
	</div>
</div>
