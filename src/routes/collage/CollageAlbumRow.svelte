<script lang="ts">
    import type { CollageAlbumWithIndex } from "./collageTypes.svelte.js";
    import CollageAlbum from "./CollageAlbum.svelte";

    const {
        albums,
        perRow,
        titlesFontSize,
        titlesToSide
    } : {
        albums: CollageAlbumWithIndex[],
        perRow: number
        titlesFontSize: number
        titlesToSide: boolean
    } = $props()

    const gtc = $derived.by(() => {
        if (titlesToSide) {
            return `repeat(${perRow}, 1fr) 3fr`
        } else {
            return `repeat(${perRow}, 1fr)`
        }
    });

</script>

<div class="album-row" style="grid-template-columns: {gtc};">
    {#each albums as album, i (album.id)}
        {#if titlesToSide}
            <div class="album-container">
                <CollageAlbum {album} i={album.i} />
            </div>
            {#if i == albums.length-1}
                {@const r = perRow - albums.length}
                {#if r > 0}
                    <div style="grid-column: span {r};"></div>
                {/if}
                <div>
                    <ul class="title-list" style="font-size: {titlesFontSize}px;">
                        {#each albums as album}
                            <li>{album.title}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
        {:else}
            <div class="album-container">
                <CollageAlbum {album} i={album.i} />
                <div class="title" style="font-size: {titlesFontSize}px;">
                    {album.title}
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>

    .album-row {
        display: grid;
        gap: .5rem;
    }

    .title-list {
        padding-left: 1.5rem;
    }

    .title {
        text-align: center;
    }
</style>