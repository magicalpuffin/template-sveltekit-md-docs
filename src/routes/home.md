---
title: template-svelte-kit-docs
description: template-sveltekit-md-docs provides an example of how markdown docs can be rendered by SvelteKit using `mdsvex`. Markdown content is supported as natively as possible, this allows compatibility with other markdown editors/renders (ex. github, obsidian).
---
**template-sveltekit-md-docs** provides an example of how markdown docs can be rendered by SvelteKit using `mdsvex`. Markdown content is supported as natively as possible, this allows compatibility with other markdown editors/renders (ex. github, obsidian).

- Using Svelte 5
- Markdown content is kept in `.md` files and dynamically rendered
- Svelte components can be imported and used in markdown files
- Image `src` paths are relative to directory instead of to static files urls and optimized using `@sveltejs/enhanced-img`
- Code blocks highlighted with `shiki`
- Math equations are rendered with `katex`

## Credits
The use of vite glob imports was based on the approach used by the `shadcn-svelte` docs. Glob importing markdown is also used in the `svelte` docs. This template was also based on what I used for my personal blog.
- https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs
- https://github.com/sveltejs/svelte.dev
- https://github.com/magicalpuffin/mli-puffinsystems