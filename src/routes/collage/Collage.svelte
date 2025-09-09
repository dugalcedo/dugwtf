<script lang="ts">
    import Album from "./Album.svelte";
    import { type List, type AlbumResult, collageStore } from "./collage.svelte.js";

    const {
        collage
    }: {
        collage: List
    } = $props()

    const rows: AlbumResult[][] = $derived.by(() => {
        const rows: AlbumResult[][] = []
        for (let i = 0; i < collage.albums.length; i += collageStore.perRow) {
            rows.push(collage.albums.slice(i, i + collageStore.perRow))
        }
        return rows
    })

    const gtc = $derived(collageStore.titlesToSide ? `repeat(${collageStore.perRow}, 1fr) 2fr;`: `repeat(${collageStore.perRow}, 1fr)`)

</script>

<div class="collage">
    <div class="albums-and-titles">
        {#each rows as row, rowI}
            <div class="row" style="
                display: grid; 
                grid-template-columns: {gtc};
                gap: {collageStore.gap}px;
                padding-bottom: {rowI < rows.length-1 ? collageStore.gap : 0}px;
            ">
                {#each row as album}
                    <Album {album} {collage} rowIndex={rowI} />
                {/each}
                {#if collageStore.titlesToSide}
                {@const r = collageStore.perRow - row.length}
                    {#if r}
                        <div class="spacer" style="grid-column: span {r};"></div>
                    {/if}
                    <div class="titles" style="font-size: {collageStore.fontSize}px">
                        <ul>
                            {#each row as album}
                                <li>{album.title}</li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>

    .row {
        & .titles {
            padding-left: 1.5rem;

            & ul {
                list-style-type: square;
            }
        }
    }
</style>