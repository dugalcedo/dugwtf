<script lang="ts">
    import type { Snippet } from "svelte";
    import { collageStore, getCollageDataFromLocalStorage } from "./collage.svelte.js";
    import { onMount } from "svelte";
    import LoadingDots from "../../components/LoadingDots.svelte";
    import CollageSelector from "./CollageSelector.svelte";
    import CollageViewControls from "./CollageViewControls.svelte";

    const {
        children
    }: {
        children: Snippet
    } = $props()

    let loading = $state(true)
    let loadError = $state("")

    onMount(() => {
        const { data, error } = getCollageDataFromLocalStorage()
        loadError = error || ""
        collageStore.data = data
        loading = false
    })

</script>

<div class="res" class:extend={collageStore.extendedWidth}>
    {#if loading}
        <LoadingDots />
    {:else}
        <nav>
            <a href="/collage">View collages</a>
            <a href="/collage/search">Search for albums</a>
        </nav>

        <div class="controls-container">
            <div>
                <CollageSelector />
            </div>
            <div>
                <CollageViewControls />
            </div>
        </div>

        {@render children()}
    {/if}
</div>


<style>
    nav {
        display: flex;
        align-items: center;
        padding-bottom: 1rem;
        
        & > a {
            flex-grow: 1;
            text-align: center;
            padding: .5rem;
            border: 1px solid rgba(255, 255, 255, 0.4);
        }
    }

    .controls-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .extend {
        width: 1500px;
        margin-left: auto;
        margin-right: auto;
        max-width: calc(100% - .5rem);
    }
</style>