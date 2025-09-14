<script lang="ts">
    import { type BlogPageData } from "../../../lib/types.js";
    const { data }: { data: BlogPageData } = $props()
</script>

<article class="blog-markdown">
    {@html data.md}
</article>

<style>
    :global(.blog-markdown, .blog-markdown *) {
        /* font-family: 'Courier New', Courier, monospace; */
    }

    :global(.blog-markdown) {
        & h1, h2, h3, h4 {
            margin: 1rem 0;
        }
    }
</style>