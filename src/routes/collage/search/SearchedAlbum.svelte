<script lang="ts">
    import type { AlbumResult } from "../collageTypes.svelte.js";
    import { collageStore, addAlbumToCollage, removeAlbumFromCollage } from "../collageTypes.svelte.js";

    const {
        album
    }: {
        album: AlbumResult
    } = $props()

    const isInCollage = $derived(collageStore.collageData.albums.findIndex(alb => alb.id === album.id) !== -1)

</script>

<div class="album">
    <img src="{album.cover_image}" alt="album cover of {album.title}">
    <p>{album.title}</p>
    {#if isInCollage}
        <button class="remove-btn" onclick={() => removeAlbumFromCollage(album)}>
            remove
        </button>
    {:else}
        <button class="add-btn" onclick={() => addAlbumToCollage(album)}>
            add
        </button>
    {/if}
</div>

<style>
    .album {
        & img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
        }
    }

    .remove-btn {
        background-color: maroon;
    }
</style>