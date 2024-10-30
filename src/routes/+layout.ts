import type { ContentModules } from "$lib/types";
import { pathToSlug } from "$lib/utils";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
	const modules = import.meta.glob("/src/lib/content/*.md") as ContentModules;

	let slugList = Object.keys(modules).map((path) => {
		return { slug: pathToSlug(path) };
	});

	slugList = slugList.sort((a, b) => a.slug.localeCompare(b.slug));

	return { slugList };
}) satisfies LayoutLoad;
