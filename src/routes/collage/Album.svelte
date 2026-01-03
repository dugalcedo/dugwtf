<script lang="ts">
    import { type AlbumResult, collageStore, type List, moveAlbum, removeAlbum } from "./collage.svelte.js";
    const { album, collage, rowIndex }: { album: AlbumResult, collage: List, rowIndex: number } = $props()
</script>


<div 
    class="album"
    class:being-moved={collageStore.beingMovedIndex === album.i}
    class:other-being-moved={collageStore.beingMovedIndex !== album.i && collageStore.beingMovedIndex !== -1 && collageStore.beingMovedIndex !== undefined}
>
    <div 
        class="cover-container" 
    >

        <img
            class="cover"
            src="https://corsproxy.io/?{encodeURIComponent(album.cover_image)}"
            crossorigin="anonymous"
            alt={album.title}
            style="
                border-radius: {collageStore.roundness}%;
                font-size: {collageStore.fontSize}px;
            "
        >

        <div class="controls">
            <button onclick={() => collageStore.beingMovedIndex = album.i}>
                MOV
            </button> 
            <button class="del" onclick={() => removeAlbum(album)}>
                DEL
            </button>
        </div>

        <div class="move-here-controls">
            <button onclick={() => moveAlbum(collage, album.i)}>
                &lt;
                <br>&lt;
                <br>&lt;
            </button>
            <button onclick={() => moveAlbum(collage, (album.i || (album.i === 0 ? 0 : -2))+1)}>
                &gt; 
                <br>&gt;
                <br>&gt;
            </button>
        </div>

    </div>

    {#if !collageStore.titlesToSide}    
        <div class="title" style="font-size: {collageStore.fontSize}px;">{album.title}</div>
    {/if}
</div>

<style>
    .cover-container {
        position: relative;

        &:hover .controls {
            display: flex;
        }
    }

    .controls {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 67%;
        display: none;
        
        & button {
            background-color: aquamarine;
            border: 4px outset aquamarine;
            color: black;
            font-size: .8rem;
            padding: 1rem 0;
            flex-grow: 1;

            &.del {
                background-color: maroon;
                color: white;
                border-color: maroon;
            }
        }
    }

    .album {
        & .title {
            text-align: center;
        }

        &.being-moved .controls {
            display: none !important;
        }

        &.other-being-moved .controls {
            display: none !important;
        }

        &.other-being-moved {
            & .cover {
                filter: blur(2px) grayscale(0.5);
            }

            .move-here-controls {
                display: flex;
            }
        }
    }

    .move-here-controls {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        justify-content: space-between;

        & button {
            font-size: .8rem;
            padding: .5rem;
            height: 100%;
            background-color: white;
            color: black;

            &:hover {
                background-color: aquamarine;
            }
        }
    }

    .cover {
        width: 100%;
        display: block;
        aspect-ratio: 1;
        object-fit: cover;
    }

</style>