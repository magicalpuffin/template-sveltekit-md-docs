import type { ContentModules } from "$lib/types";
import { pathToSlug } from "$lib/utils";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
	const modules = import.meta.glob("/src/lib/content/*.md") as ContentModules;

	const slugList = Object.keys(modules).map((path) => {
		return { slug: pathToSlug(path) };
	});

	return { slugList };
}) satisfies LayoutLoad;
