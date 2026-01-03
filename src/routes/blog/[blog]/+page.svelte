<script lang="ts">
    import './blog.css'
    import { type BlogPageData } from "../../../lib/types.js";
    const { data }: { data: BlogPageData } = $props()
</script>

{#if !data.blog}
    <div class="blog-not-found">
        <p>BLOG NOT FOUND</p>
    </div>
{:else}
    <article class="blog-markdown">
        <p class="time">posted {data.blog.date}</p>
        {@html data.blog.post}
    </article>
{/if}


