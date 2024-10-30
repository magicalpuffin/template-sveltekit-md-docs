<script lang="ts">
	import '$lib/content-styles.css';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head
	><title>{data.metadata.title}</title><meta
		name="description"
		content={data.metadata.description}
	/>
	<link
		href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<h1 class="my-4 text-4xl font-bold">{data.metadata.title}</h1>
<hr class="my-4 border" />
<article
	class="prose prose-img:my-0 prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-lg"
>
	<data.component></data.component>
</article>
