<script lang="ts">
    import type { AlbumResult } from "../collage.svelte.js";
    import { collageStore, addAlbum, removeAlbum } from "../collage.svelte.js";

    const {
        album
    }: {
        album: AlbumResult
    } = $props()

    const collage = $derived(collageStore.data.collages.find(list => list.name == collageStore.selectedCollage))
    const albumInCollage = $derived(collage?.albums.some(alb => alb.id == album.id))

</script>

<div class="album">
    <img src="{album.cover_image}" alt="album cover of {album.title}">
    <p>{album.title}</p>
    {#if albumInCollage}
        <button class="rem" onclick={() => removeAlbum(album)}>
            Remove from {collage?.name}
        </button>
    {:else}
        <button class="add" onclick={() => addAlbum(album)}>
            Add to {collage?.name}
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

    .rem {
        background-color: maroon;
    }
    
</style>