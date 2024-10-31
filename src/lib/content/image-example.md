---
title: Image Example
description: This is a description
---
Images in markdown are optimized using `@sveltejs/enhanced-img`. File paths are also fixed

## Examples
### Basic image in markdown
**Markdown Text:**

```markdown
![example](/static/testphoto.png)
```
**Rendered Result:**

![example](/static/testphoto.png)

## Image with a space


**Markdown Text:**
```markdown
![example2](/static/favicon%20with%20space.png)
```

**Rendered Result:**
![example2](/static/favicon%20with%20space.png)
## How it works
Add `@sveltejs/enhanced-img` to plugins
- https://svelte.dev/docs/kit/images#sveltejs-enhanced-img

```ts
// vite.config.ts
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
});
```

To use enhanced images in markdown, a custom rehype plugin is used. Image tags are converted into `enhanced:img` before being rendered. The file path used by `@sveltejs/enhanced-img` are import paths while image `src` paths to static files are urls. To support files with spaces, and match how other markdown editors parse images, `%20` is converted to spaces.

```js
// svelte.config.js
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
						node.properties.src = node.properties.src.replaceAll("%20", " ");
						node.tagName = "enhanced:img";
					}
				}
			}
		});
	};
}


```