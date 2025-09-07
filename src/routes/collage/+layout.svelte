<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { getCollageFromLocalStorage, collageStore } from "./collageTypes.svelte.js";
    import LoadingDots from "../../components/LoadingDots.svelte";

    const { children } : { children: Snippet } = $props()

    onMount(() => {
        collageStore.collageData = getCollageFromLocalStorage()
    })
    
</script>

{#if collageStore.collageData}
    <br><br>
    {@render children()}

    <div class="res">
        <nav>
            <a href="/collage">My collage</a>
            <a href="/collage/search">Search for albums</a>
        </nav>
    </div>
{:else}
    <div class="res" style="text-align: center;">
        <LoadingDots />
    </div>
{/if}

<style>
    nav {
        padding-bottom: 1.5rem;
    }
</style>
