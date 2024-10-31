---
title: Math Equations
description: This is a description
---
Math equations are rendered using `katex`

## Examples

**Markdown Text:**

```markdown
Inline math are rendered $y = mx +b$

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

Values within brackets are rendered directly instead of being evaluated by Svelte, $k_{2-1}$.  Variables can also be used in brackets without issue, $k_{a}$.
```

**Rendered Result:**

Inline math are rendered $y = mx +b$

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

Values within brackets are rendered directly instead of being evaluated by Svelte, $k_{2-1}$.  Variables can also be used in brackets without issue, $k_{a}$.



## How it works
Support for math equations by `mdsvex` isn't the most clear. Math equations are rendered with `rehype-katex` and `remark-math`. Versions of `remark-math` after `3.0.0` don't work.
- https://github.com/remarkjs/remark-math
```
"rehype-katex": "^7.0.0",
"remark-math": "3.0.0",
```

There is a custom plugin which selects every element with the `katex` class name and renders it as raw html. 
```js
// svelte.config.js
import { fromString as stringToHast } from "hast-util-from-string";
import { toHtml as hastToHtml } from "hast-util-to-html";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

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

```