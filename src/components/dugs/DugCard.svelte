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

    {#if selected}
        <div class="controls">
            <!-- <a href="/dugscography/{dug.title}">
                go to page
            </a> -->
            <a href="##" onclick={e => {
                e.stopPropagation()
                e.preventDefault()
                openBcPlayer(dug)
            }}>
                play here
            </a>
            <a href={dug.bc_link} target="_blank">
                bandcamp
            </a>
        </div>
        <div class="info">
            <div class="title">
                <h5>{dug.title}</h5>
                <p>by {dug.artist}</p>
            </div>
            <p>{dug.id} ({dug.year})</p>
        </div>
    {/if}
</button>

<style>
    .dug-card {
        padding: .5rem;
        border: 0;
        position: relative;
        color: var(--fg) !important;

        & .cover {
            width: 100%;
            display: block;
            image-rendering: pixelated;
        }

        &.selected {
            grid-column: span 2;
            grid-row: span 2;

            display: grid;
            grid-template-columns: 1fr 1fr;
            align-content: flex-start;

            border: 3px dashed var(--bg);
            border-left: 0;
            border-right: 0;

            background-color: var(--fgo20);

            
        }

        &.selected .cover, &:hover .cover {
            filter: none !important;
            mix-blend-mode: normal !important;
        }
    }

    .controls {
        display: flex;
        flex-direction: column;

        & a {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: none !important;
            background-color: var(--hl);
            color: var(--bg) !important;

            &:hover {
                background-color: var(--hc1) !important;
            }
        }
    }

    .info {
        grid-column: span 2;
        text-align: left;

        & .title {
            & > * {
                display: inline;
            }

            & p {
                font-size: .8rem;
            }
        }

        & h5 {
            font-size: 1.25rem;
            font-style: italic;
        }
    }


</style>