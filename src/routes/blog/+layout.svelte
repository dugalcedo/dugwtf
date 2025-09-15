<script lang="ts">
    import type { Snippet } from "svelte";
    import type { BlogLayoutData } from "../../lib/types.js";
    const { children, data }: { children: Snippet, data: BlogLayoutData } = $props()
    const recentDates = data.dates.slice(0, 5)
</script>


<div class="res">
    
    <nav>
        <h3>Most recent entries:</h3>
        {#each recentDates as date}
            <a href="/blog/{date}">{date}</a>
        {/each}
    </nav>

    {@render children()}
</div>

<style>
    nav {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>