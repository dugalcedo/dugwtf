<script lang="ts">
    import { type PortfolioItem } from "./portfolio";
    const { item }: { item: PortfolioItem } = $props()
    import TechBadge from "./TechBadge.svelte";

    let longDescShown = $state(false)
</script>

<dt>
    <span>{item.title}</span>
    <div class="tech-stack">
        {#each item.techStack as tech}
            <TechBadge {tech} />
        {/each}
    </div>
</dt>
<dd>
    <nav class="links">
        <div class="github">
            {#if item.githubUrl}
                <a href="{item.githubUrl}" rel="noreferrer" target="_blank">View on github</a>
            {:else}
                <small>[PRIVATE REPO]</small>
            {/if}
        </div>
        {#if item.deploymentUrl}
            <div class="deploy">
                <a href="{item.deploymentUrl}" rel="noreferrer" target="_blank">See deployed</a>
            </div>
        {/if}
    </nav>
    <div class="description">
        {#if longDescShown}
            {#each item.description.long as p}
                <div class="long">
                    <p>{p}</p>
                </div>
            {/each}
        {:else}
            <p>
                {item.description.short} 
                <button class="read-more" onclick={() => longDescShown = true}>
                    read more...
                </button>
            </p>
        {/if}
    </div>
</dd>

<style>
    dt {
        font-size: 2rem;
        font-style: italic;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--fg5);
        margin-bottom: .5rem;
    }

    dd {
        margin-bottom: 4rem;
    }

    .tech-stack {
        display: flex;
        align-items: center; gap: 1rem;
    }

    .read-more {
        padding: 0;
        border: 0;
    }

    .long {
        & p {
            margin-bottom: 1rem;
        }
    }

    nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 1rem;
    }
</style>