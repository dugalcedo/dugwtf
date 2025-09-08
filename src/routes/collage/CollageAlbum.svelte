<script lang="ts">
    import { collageStore, type CollageAlbum, removeAlbumFromCollage, moveAlbumInCollage, moveAlbumToDifferentTier } from "./collageTypes.svelte.js";

    const {
        album,
        i,
        moveTierOnMove,
        collageType
    }: {
        album: CollageAlbum
        i: number
        moveTierOnMove: boolean
        collageType: 'classic' | 'tiered'
    } = $props()

    const beingMoved = $derived(i === collageStore.beingMovedIndex)
    const moveOngoing = $derived(-1 != collageStore.beingMovedIndex)


    const handleMove = () => {
        collageStore.beingMovedIndex = i
    }

    const cancel = () => {
        collageStore.beingMovedIndex = -1
    }

    const handleMoveHere = (delta: 1 | 0) => {
        moveAlbumInCollage(collageStore.beingMovedIndex, i+delta, moveTierOnMove)
    }
</script>


<div class="album" 
    class:being-moved={beingMoved} 
    class:darken={!beingMoved && (collageStore.beingMovedIndex != -1)}
    data-i={i || "N/A"}
>
    {#if moveOngoing && (i == 0) && (collageStore.beingMovedIndex !== 0)}
        <button class="move-here-btn left" onclick={() => handleMoveHere(0)}>
            HERE
        </button>
    {/if}
    <img class="cover" src={album.cover_image} alt="album cover of {album.title}">
    {#if moveOngoing && (collageStore.beingMovedIndex !== i+1) && (collageStore.beingMovedIndex !== i)}
        <button class="move-here-btn right" onclick={() => handleMoveHere(1)}>
            HERE
        </button>
    {:else if !moveOngoing}
        <div class="controls">
            <button 
                class="move-btn" 
                onclick={handleMove}
            >
                &#10021;
            </button>
            <button class="remove-btn" onclick={() => removeAlbumFromCollage(album)}>
                REMOVE
            </button>
        </div>
    {/if}
    {#if beingMoved}
        <button class="cancel-btn" onclick={cancel}>
            CANCEL
        </button>
    {/if}
</div>


<style>
    .album {
        position: relative;

        &.being-moved {
            outline: 3px dashed aquamarine;

            & img {
                animation: focused linear .67s infinite;
            }
        }
        
        &.darken img {
            opacity: 0.5;
            filter: brightness(0.5) blur(1px);
        }
    }

    @keyframes focused {
        0% {
            filter: brightness(1);
        }
        25% {
            filter: brightness(1.1);
        }
        75% {
            filter: brightness(0.9);
        }
        100% {
            filter: brightness(1);
        }
    }

    .cover {
        width: 100%;
        aspect-ratio: 1;
        display: block;
        object-fit: cover;
    }

    .controls {
        display: none;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
    }

    .album:hover .controls {
        display: flex;
    }

    .move-btn {
        background-color: white;
        color: black;
        padding: 3px;
        font-size: .7rem;
    }

    .remove-btn {
        background-color: maroon;
        padding: 3px;
        font-size: .7rem;
    }

    .move-here-btn {
        position: absolute;
        top: 50%;
        writing-mode: sideways-lr;
        z-index: 5;
        padding: 4px;
        font-size: .8rem;
        background-color: white;
        color: black;

        &.right {
            right: 0;
            translate: 50% -50%;
        }

        &.left {
            left: 0;
            translate: -50% -50%;
        }

        &:hover {
            background-color: aquamarine;
        }
    }

    .cancel-btn {
        position: absolute;
        bottom: 0;
        left: 50%;
        translate: -50% 0;
        background-color: maroon;
        font-size: .8rem;
        padding: 4px 12px;
    }
</style>