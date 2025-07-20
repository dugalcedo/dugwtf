<script lang="ts">
    import bcplayer from "../../context/bcplayer.svelte.js";
    import BandcampPlayer from "../BandcampPlayer.svelte";
</script>

{#if bcplayer.dug}
    <footer>
        <BandcampPlayer dug={bcplayer.dug} />
        <button onclick={() => bcplayer.dug = null}>
            &times;
        </button>
    </footer>
{/if}

<style>
    footer {
        display: flex;
        background-color: #14d393;

        & > button {
            aspect-ratio: 1;
            border: 0;
            color: var(--black);
            font-size: 1.1rem;
            font-weight: bold;
            font-family: monospace;
        }
    }

    :global(footer iframe) {
        filter: sepia(2) brightness(0.7) saturate(10) hue-rotate(90deg);
        flex-grow: 1;
    }
</style>