import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { fromString as stringToHast } from "hast-util-from-string";
import { toHtml as hastToHtml } from "hast-util-to-html";
import { escapeSvelte, mdsvex } from "mdsvex";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { visit } from "unist-util-visit";

import { createHighlighter } from "shiki";

const theme = "github-dark";
const highlighter = await createHighlighter({
	themes: [theme],
	langs: [
		"javascript",
		"typescript",
		"svelte",
		"html",
		"sh",
		"toml",
		"powershell",
		"python",
	],
});

/**
 * @import {Root} from 'hast'
 */

export function rehypeEnhancedImage() {
	/**
	 * @param {Root} tree
	 * @return {undefined}
	 */
	return (tree) => {
		visit(tree, "element", (node) => {
			// Check if the node is an img element
			if (node.tagName === "img") {
				if (typeof node.properties.src === "string") {
					const srcext = node.properties.src?.toString().split(".").pop();
					node.properties.src = node.properties.src.replaceAll("%20", " ");

					if (srcext === "gif") {
						node.properties.src = node.properties.src.replace("/static", "");
					} else {
						// Change the tag name to 'enhanced:img'
						node.tagName = "enhanced:img";
					}
				}
			}
		});
	};
}

/**
 * @import {Root} from 'hast'
 */

export function rehypeHtmlKatex() {
	/**
	 * @param {Root} tree
	 * @return {undefined}
	 */
	return (tree) => {
		visit(tree, "element", (node) => {
			// Check if the node is an img element
			if (node.properties?.className?.includes("katex")) {
				const katexHtml = hastToHtml(node);
				stringToHast(node, `{@html ${JSON.stringify(katexHtml)}}`);
			}
		});
	};
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeEnhancedImage, rehypeKatex, rehypeHtmlKatex],
	extensions: [".svx", ".md"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
			return `{@html \`${html}\` }`;
		},
	},
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
	},

	extensions: [".svelte", ".svx", ".md"],
};

export default config;
