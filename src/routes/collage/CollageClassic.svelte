<script lang="ts">
    import CollageAlbum from "./CollageAlbum.svelte";
    import { type CollageAlbum as CollageAlbumType } from "./collageTypes.svelte.js";
    import { collageStore } from "./collageTypes.svelte.js";

    let perRow = $state(4);
    let titlesToSide = $state(true);
    let titlesFontSize = $state(12);

    const actualPerRow = $derived.by(() => {
        if (collageStore.collageData.albums.length < perRow){
            return collageStore.collageData.albums.length
        } else {
            return perRow
        }
    });

    const gtc = $derived.by(() => {
        if (titlesToSide) {
            return `repeat(${actualPerRow}, 1fr) 3fr`
        } else {
            return `repeat(${actualPerRow}, 1fr)`
        }
    });

    type CollageAlbumWithTrueIndex = CollageAlbumType & {
        i: number
    }
    const rows: CollageAlbumWithTrueIndex[][] = $derived.by(() => {
        const albums: CollageAlbumWithTrueIndex[] = collageStore.collageData.albums.map((album, i) => ({...album, i}))
        const result: CollageAlbumWithTrueIndex[][] = [];
        const rowCount = Math.ceil(albums.length/actualPerRow)
        for (let i = 0; i < rowCount; i++) {
            const start = i * actualPerRow
            const end = (i+1) * actualPerRow
            result.push(albums.slice(start, end))
        }
        return result
    })

</script>

<h2>Classic collage style</h2>

<div class="controls">
    <div class="field">
        <label for="classicCollageControls_fontSize">Font size</label>
        <input type="number" id="classicCollageControls_fontSize" min={6} max={24} step={1} bind:value={titlesFontSize}>
    </div>
    <div class="field">
        <label for="classicCollageControls_perRow">Per row</label>
        <input type="number" id="classicCollageControls_perRow" min={1} max={8} step={1} bind:value={perRow}>
    </div>
    <div class="field">
        <label for="classicCollageControls_titlesToSide">Titles to side</label>
        <input type="checkbox" id="classicCollageControls_titlesToSide" bind:checked={titlesToSide}>
    </div>
</div>

<div id="collage-container">
    <div class="albums" class:grid={!titlesToSide} style="grid-template-columns: {gtc};">
        {#if titlesToSide}
            {#each rows as row}
                <div class="album-row" style="grid-template-columns: {gtc};">
                    {#each row as album, i (album.id)}
                        <div class="album-container">
                            <CollageAlbum {album} i={album.i} />
                        </div>
                        {#if i == row.length-1}
                        {@const r = actualPerRow - row.length}
                        {#if r > 0}
                            <div style="grid-column: span {r};"></div>
                        {/if}
                        <div>
                            <ul class="title-list" style="font-size: {titlesFontSize}px;">
                                {#each row as album}
                                    <li>{album.title}</li>
                                {/each}
                            </ul>
                        </div>
                        {/if}
                    {/each}
                </div>
            {/each}
        {:else}
            {#each collageStore.collageData.albums as album, i (album.id)}
                <div class="album-container">
                    <CollageAlbum {album} {i} />
                    <div class="title" style="font-size: {titlesFontSize}px;">
                        {album.title}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .albums.grid {
        display: grid;
        gap: .5rem;
    }

    .albums > .album-row:not(:last-child) {
        padding-bottom: .5rem;
    }

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