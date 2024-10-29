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
