---
title: Creating Markdown
description: Markdown files are created within src/lib/content and dynamically rendered using the slug. This uses vite glob import to load all markdown content and pass it as a component to the svelte page
---
Markdown files are directly created in `src/lib/content` and are dynamically rendered based on the slug.

## How it works
Using vite glob imports are used to automatically import all markdown files
- https://v3.vitejs.dev/guide/features.html#glob-import

```ts
// routes/[slug]/page.ts
import type { ContentModules } from "$lib/types";
import { pathToSlug, slugToPath } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = "auto";

export const load = (async ({ params }) => {
	const modules = import.meta.glob("/src/lib/content/*.md") as ContentModules;

	const contentModule = modules[slugToPath(params.slug)];

	if (!contentModule) {
		error(404, "Can't find content");
	}

	const { default: component, metadata } = await contentModule().then();

	return { component, metadata };
}) satisfies PageLoad;

export const entries: EntryGenerator = async () => {
	const modules = import.meta.glob("/src/lib/content/*.md") as ContentModules;

	const entries = Object.keys(modules).map((path) => {
		return { slug: pathToSlug(path) };
	});

	return entries;
};
```

The blog component data imported during the load is rendered as a Svelte component.
```svelte
<script lang="ts">
	// routes/[slug]/page.svelte
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1 class="my-4 text-4xl font-bold">{data.metadata.title}</h1>
<hr class="my-4 border" />
<article
	class="prose prose-img:my-0 prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-lg"
>
	<data.component></data.component>
</article>
```
