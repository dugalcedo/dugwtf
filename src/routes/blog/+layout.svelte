<script lang="ts">
    import type { Snippet } from "svelte";
    import type { BlogLayoutData } from "../../lib/types.js";
    const { children, data }: { children: Snippet, data: BlogLayoutData } = $props()
    const recentDates = data.dates.slice(0, 5)
</script>


<div class="res">
    
    <nav>
        <p>Most recent entries:</p>
        {#each recentDates as date}
            <a href="/blog/{date}" class="recent-blog">{date}</a>
        {/each}
    </nav>

    {@render children()}
</div>

<style>
    nav {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 5px;
        background-color: rgba(255, 255, 255, 0.02);

        & p {
            font-size: .8rem;
        }
    }

    .recent-blog {
        background-color: aquamarine;
        color: black;
        padding: 3px;
        font-size: .6rem;
        text-decoration: none;
    }
</style>