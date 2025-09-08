<script lang="ts">
    import { createAlbumRows, type CollageAlbum as CollageAlbumType } from "./collageTypes.svelte.js";
    import { collageStore } from "./collageTypes.svelte.js";
    import CollageAlbumRow from "./CollageAlbumRow.svelte";

    const {
        perRow,
        titlesFontSize,
        titlesToSide,
        collageType
    }: {
        perRow: number,
        titlesFontSize: number,
        titlesToSide: boolean,
        collageType: 'classic' | 'tiered'
    } = $props()

    const gtc = $derived.by(() => {
        if (titlesToSide) {
            return `repeat(${perRow}, 1fr) 3fr`
        } else {
            return `repeat(${perRow}, 1fr)`
        }
    });


    const rows = $derived(createAlbumRows(collageStore.collageData.albums.map((alb, i) => ({...alb, i})), perRow))

</script>

<div id="collage-container">
    <div class="albums" style="grid-template-columns: {gtc};">
       {#each rows as row}
            <CollageAlbumRow 
                albums={row}
                {perRow}
                {titlesFontSize}
                {titlesToSide}
                {collageType}
                moveTierOnMove={false}
            />
       {/each}
    </div>
</div>

<style>

    .albums {
        display: flex;
        flex-direction: column;
        row-gap: .5rem;
    }

    :global(.albums .album-row:last-child) {
        padding-bottom: 0 !important;
    }
</style>