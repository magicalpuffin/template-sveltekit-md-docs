<script lang="ts">
	import HomeMarkdown, { metadata } from './home.md';
	import type { ContentMetadata } from '$lib/types';
	const homeMetadata = metadata as ContentMetadata;
</script>

<svelte:head
	><title>{homeMetadata.title}</title><meta
		name="description"
		content={homeMetadata.description}
	/>
</svelte:head>

<h1 class="my-4 text-4xl font-bold">{homeMetadata.title}</h1>
<hr class="my-4 border" />

<article class="prose">
	<HomeMarkdown />
</article>
