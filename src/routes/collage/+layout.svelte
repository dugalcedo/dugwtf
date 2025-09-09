<script lang="ts">
    import type { Snippet } from "svelte";
    import { collageStore, getCollageDataFromLocalStorage, type LAYOUT_DATA } from "./collage.svelte.js";
    import { onMount } from "svelte";
    import LoadingDots from "../../components/LoadingDots.svelte";
    import CollageSelector from "./CollageSelector.svelte";
    import CollageViewControls from "./CollageViewControls.svelte";

    const {
        children,
        data
    }: {
        children: Snippet
        data: LAYOUT_DATA
    } = $props()

    let loading = $state(true)
    let loadError = $state("")

    onMount(() => {
        const { data, error } = getCollageDataFromLocalStorage()
        loadError = error || ""
        collageStore.data = data
        loading = false
    })

    const navItems = [
        {text: "View collages", href: "/collage"},
        {text: "Search for albums", href: "/collage/search"},
        {text: "Load lastfm data", href: "/collage/lastfm"}
    ]

</script>

<svelte:head>
    <title>Album cover collage maker - Dug Alcedo</title>
    <meta name="description" content="Generate a collage of album covers by searching for albums manually or via lastfm profile.">
</svelte:head>

<div class="res" class:extend={collageStore.extendedWidth}>
    {#if loading}
        <LoadingDots />
    {:else}
        <div class="controls-container">
            <div>
                <CollageSelector />
            </div>
            <div>
                <CollageViewControls />
            </div>
        </div>
        
        <nav>
            <div class="head">
                <img src="/icons/cursor.svg" alt="cursor">
                Navigation
            </div>
            <div class="body">
                {#each navItems as item}
                    <a href="{item.href}" class:active={data.path == item.href}>{item.text}</a>
                {/each}
            </div>
        </nav>


        {@render children()}
    {/if}
</div>


<style>
    nav {
        margin-bottom: 1rem;
        margin-top: 10px;
        border: 1px solid aquamarine;

        & > .head {
            background-color: aquamarine;
            color: black;
            font-weight: bold;
            padding: 5px;
            display: flex;
            align-items: center;
            gap: 10px;

            & img {
                width: 25px;
            }
        }

        & > .body {
            display: flex;
            align-items: center;
        }
        
        & a {
            flex-grow: 1;
            text-align: center;
            padding: .5rem;
        }
    }

    .controls-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .extend {
        width: 1500px;
        margin-left: auto;
        margin-right: auto;
        max-width: calc(100% - .5rem);
    }

    .active {
        background-color: aquamarine;
        color: black;
    }
</style>