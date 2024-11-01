---
title: Svelte Components
description: mdsvex allows using svelte components in markdown files
---

`mdsvex` allows using Svelte components in markdown files

## Example

**Markdown Text:**

```markdown
<script>
    import FancyButton from "$lib/components/FancyButton.svelte"
    let numberClicked = 0
</script>

Number of clicks: {numberClicked}
<FancyButton onclick={() => numberClicked+=1}>Fancy Button</FancyButton>
```

**Rendered Result:**

<script>
    import FancyButton from "$lib/components/FancyButton.svelte"
    let numberClicked = 0
</script>

 Number of clicks: {numberClicked}
<FancyButton onclick={() => numberClicked+=1}>Fancy Button</FancyButton>
