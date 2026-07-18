<script lang="ts">
    import type { Dug } from "$lib/clientData/dugs";
    import { openBcPlayer } from "$lib/stores/bcPlayerStore.svelte";

    let { 
        dug,
        filter = "grayscale(1)",
        blend = "lighten",
        selectedDugTitle = $bindable()
    }: {
        dug: Dug
        filter?: string
        blend?: string
        selectedDugTitle: string
    } = $props()

    const select = () => {
        selectedDugTitle = dug.title
    }

    const deselect = () => {
        selectedDugTitle = ""
    }

    const selected = $derived(selectedDugTitle === dug.title)

</script>

<button 
    class="dug-card no-flicker"
    onclick={select}
    onfocus={select}
    class:selected={selected}
>
    {#if dug.hasIcon && !selected}
        <img 
            class="album-icon"
            src="/images/album_icons/{dug.id}.png" 
            alt="icon for '{dug.title}' by {dug.artist}"
        >
    {:else}
        <img 
            class="cover" 
            src={dug?.cover_s} 
            alt="album cover of '{dug.title}' by '{dug.artist}'"
            style="
                filter: {filter};
                mix-blend-mode: {blend};
            "
        >
    {/if}

    <div class="right">
        <h4>{dug.title}</h4>
        {#if !selected}
            <span class="year-chip">{dug.year}</span>
        {/if}
        {#if selected}
            <p>{dug.year}</p>
            <small style="font-size: 0.5rem;">{dug.id}</small>
            <small>{dug.type}</small>
            <div style="flex-grow: 1;"></div>
            <div class="controls">
                <!-- svelte-ignore node_invalid_placement_ssr -->
                <button onclick={e => {
                    e.stopPropagation()
                    e.stopImmediatePropagation()
                    openBcPlayer(dug)
                }}>
                    &#9654;
                </button>
                <a href={dug.bc_link} target="_blank">get</a>
                <a href="/dugscography/{dug.id}">see more</a>
            </div>
        {/if}
    </div>
</button>

<style>
    .dug-card {
        padding: .5rem;
        border: 0;
        position: relative;
        color: var(--fg) !important;
        width: 100%;
        gap: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;

        & .year-chip {
            background-color: var(--fg3);
            color: var(--bg1);
            font-size: 0.7rem;
            align-self: start;
            padding: 0 .25rem;
            margin-top: .5rem;
        }

        & .right {
            text-align: left;
            display: flex;
            flex-direction: column;
        }

        & h4 {
            font-style: italic;
            text-align: left;
        }

        & .album-icon {
            width: 100%;
        }

        & .cover {
            width: 100%;
            display: block;
            image-rendering: pixelated;
            border-radius: 1rem;
        }

        &:hover, &:focus, &.selected {
            background-color: var(--fgo10);
        }

        &.selected .cover, &:hover .cover {
            filter: none !important;
            mix-blend-mode: normal !important;
            border-radius: 0;
        }
        
        &.selected .cover {
            width: 100%;
        }

        & .controls {
            width: 100%;
            margin-top: 1rem;

            & > * {
                width: 100%;
                border: 0;
                padding: 0;
                font-size: 1rem;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                outline: 1px solid var(--fgo20);
                padding: .25rem;
            }
        }
    }


</style>