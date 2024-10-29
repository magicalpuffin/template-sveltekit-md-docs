<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1 class="my-4 text-4xl font-bold">{data.metadata.title}</h1>
<article
	class="prose prose-img:my-0 prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-lg"
>
	<data.component></data.component>
</article>
