export function pathToSlug(path: string) {
	return path.replace("/src/lib/content/", "").replace(".md", "");
}

export function slugToPath(slug: string) {
	return `/src/lib/content/${slug}.md`;
}
