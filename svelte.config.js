import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

import { visit } from "unist-util-visit";

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

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	rehypePlugins: [rehypeEnhancedImage],
	extensions: [".svx", ".md"],
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
