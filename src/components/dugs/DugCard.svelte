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
    <img 
        class="cover" 
        src={dug?.cover_s} 
        alt="album cover of '{dug.title}' by '{dug.artist}'"
        style="
            filter: {filter};
            mix-blend-mode: {blend};
        "
    >

    <div class="right">
        <h4>{dug.title}</h4>
        {#if selected}
            <p>{dug.year}</p>
            <small>{dug.id}</small>
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
        display: flex;
        width: 100%;
        gap: 1rem;

        & .right {
            text-align: left;
            display: flex;
            flex-direction: column;
        }

        & h4 {
            font-style: italic;
            text-align: left;
        }

        & .cover {
            width: 75px;
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
            width: 125px;
        }

        & .controls {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            & > * {
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