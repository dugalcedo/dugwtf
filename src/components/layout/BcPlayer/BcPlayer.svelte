<script lang="ts">
    import { bc, closeBcPlayer, hideBcPlayer, showBcPlayer } from "$lib/stores/bcPlayerStore.svelte";

</script>

{#if bc.dug}
    <div 
        id="BC_PLAYER"
        class:shown={bc.shown}
    >
        <div class="controls">
            <button 
                class="no-flicker"
                onclick={hideBcPlayer}
            >
                HIDE
            </button>
            <button 
                class="no-flicker"
                onclick={closeBcPlayer}
            >
                STOP
            </button>
        </div>
        <iframe title="bandcamp player" style="border: 0; width: 100%; height: 350px;" src="https://bandcamp.com/EmbeddedPlayer/album={bc.dug.bc_id}/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/" seamless><a href="https://dugalcedo.bandcamp.com/album/goos-beyond">goos beyond by Dug Alcedo</a></iframe>
    </div>
{/if}

{#if bc.dug && !bc.shown}
    <button 
        class="player-tray no-flicker"
        onclick={showBcPlayer}
    >
        PLAYER
    </button>
{/if}

<style>
    #BC_PLAYER {
        visibility: hidden;
        pointer-events: none;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 375px;
        overflow: hidden;
        border-top: 5px solid var(--comp);

        & iframe {
            width: calc(100% + 10px) !important;
            height: calc(100% + 10px) !important;
            translate: -5px -5px;
            filter: contrast(1.35);
            z-index: 1;
        }

        & .controls {
            width: 50%;
            display: flex;
            position: absolute;
            z-index: 2;
            right: 0;
            top: 0;
        }

        & button {
            flex-grow: 1;
            background-color: var(--comp);
            border: 4px solid var(--comp) !important;
            border-top: 0 !important;
            color: var(--fg);
        }

        &.shown {
            visibility: visible;
            pointer-events: all;
            background-color: var(--bg);
        }


        @media (width >= 700px) {
            width: unset;
            left: unset;
            right: 0;
            border-left: 4px solid var(--comp) !important;
        }
    }

    .player-tray {
        position: fixed;
        z-index: var(--z-bc-player-tray);
        top: 0;
        right: 50px;
        background-color: var(--comp);
        border: 2px solid var(--comp);
        color: var(--fg);
    }
</style>