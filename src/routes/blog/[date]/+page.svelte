<script lang="ts">
    import './blog.css'
    import { type BlogPageData } from "../../../lib/types.js";
    const { data }: { data: BlogPageData } = $props()
</script>

<article class="blog-markdown">
    <p class="time">{data.date}</p>
    {@html data.md}
</article>

