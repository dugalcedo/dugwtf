<script lang="ts">
    import { collageStore, type CollageAlbum, removeAlbumFromCollage } from "./collageTypes.svelte.js";

    const {
        album
    }: {
        album: CollageAlbum
    } = $props()

    // const isInCollage = $derived(collageStore.collageData.albums.findIndex(alb => alb.id === album.id) !== -1)
</script>

<div class="album">
    <img class="cover" src={album.cover_image} alt="album cover of {album.title}">
    <div class="controls">
        <button class="move-btn">
            &#10021;
        </button>
        <button class="remove-btn" onclick={() => removeAlbumFromCollage(album)}>
            REMOVE
        </button>
    </div>
</div>

<style>
    .album {
        position: relative;
    }

    .cover {
        width: 100%;
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
        cursor: grab;
    }

    .remove-btn {
        background-color: maroon;
    }
</style>