---
title: Markdown Links
description: This is a description
---
Links in between markdown files are automatically converted to corresponding urls on the site.

## Examples

**Markdown Text:**

```markdown
- [Getting Started](/src/lib/content/getting-started.md)
- [Creating Markdown](/src/lib/content/creating-markdown.md)
```

**Rendered Result:**

- [Getting Started](/src/lib/content/getting-started.md)
- [Creating Markdown](/src/lib/content/creating-markdown.md)


## How it works

There is a custom rehype plugin which converts links between markdown files in `/src/lib/content` to urls.

```js
import { visit } from "unist-util-visit";

/**
 * @import {Root} from 'hast'
 */

export function rehypeMarkdownLinks() {
	/**
	 * @param {Root} tree
	 * @return {undefined}
	 */
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName === "a") {
				if (typeof node.properties.href === "string") {
					const srcext = node.properties.href?.toString().split(".").pop();

					if (srcext === "md") {
						node.properties.href = node.properties.href
							.replace("/src/lib/content", "")
							.replace(".md", "");
					}
				}
			}
		});
	};
}

```