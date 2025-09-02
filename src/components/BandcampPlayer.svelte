<script lang="ts">
    import { bcplayer } from "../context/bcplayer.svelte.js";
</script>

{#if bcplayer.dug}
    <div class="bcplayer bcplayer-open" class:hidden={!bcplayer.isOpen}>
        <div class="controls">
            <button onclick={() => bcplayer.isOpen = false}>&larr;</button>
            <button onclick={() => bcplayer.dug = null}>&times;</button>
        </div>
        <iframe title="bandcamp player" style="border: 0; width: 350px; height: 373px;" src="https://bandcamp.com/EmbeddedPlayer/album={bcplayer.dug.bc_id}/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/" seamless></iframe>
    </div>
    <div class="bcplayer bcplayer-closed" class:hidden={bcplayer.isOpen}>
        <p>&#9835;</p>
        <button onclick={() => bcplayer.isOpen = true}>&rarr;</button>
        <button onclick={() => bcplayer.dug = null}>&times;</button>
    </div>
{/if}

<style>
    .bcplayer {
        position: fixed;
        bottom: 0;
        left: 0;
        transform: translate(0%, 0%);
        z-index: 400;
    }

    .hidden {
        transform: translate(-100%, 0%);
    }

    button {
        font-size: 2rem;
    }

    .controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .bcplayer-closed {
        height: 400px;
        max-height: 100dvh;
        display: flex;
        flex-direction: column;

        & button {
            flex-grow: 1;
            padding: 0px 0.5rem;
            border: 0;
            border-right: 1px solid var(--white);
            background-color: var(--black);

            &:hover {
                background-color: var(--white);
            }
        }

        & p {
            font-size: 2rem;
            padding: 0px 0.5rem;
            background-color: var(--white);
            color: var(--black);
        }
    }

    .bcplayer-open {
        & button {
            border: 0;
            border-top: 1px solid var(--white);
            background-color: var(--black);

            &:hover {
                background-color: var(--white);
            }
        }
    }

    iframe {
        filter: contrast(1.4);
    }
</style>

