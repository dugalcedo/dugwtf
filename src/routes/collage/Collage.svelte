<script lang="ts">
    import { tick } from "svelte";
    import Album from "./Album.svelte";
    import { type List, type AlbumResult, collageStore } from "./collage.svelte.js";
    import html2canvas from "html2canvas";

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

    let downloading = $state(false)

    let collageElement: HTMLDivElement | null = $state(null)

    const takeScreenshot = async () => {
        downloading = true

        await tick()

        const canvas = await html2canvas(collageElement!, {
            scale: 2,
            allowTaint: true,
            useCORS: true,
            backgroundColor: "#111",
        })

        // Doawnload
        const dataUrl = canvas.toDataURL('image/jpeg')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `collage.jpeg`
        document.body.append(a)
        a.click()
        a.remove()

        downloading = false
    }

</script>

<div class="collage" bind:this={collageElement} class:downloading={downloading}>
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

<button onclick={takeScreenshot}>
    Download image
</button>

<style>

    .row {
        & .titles {
            padding-left: 1.5rem;

            & ul {
                list-style-type: none;

                & li {
                    position: relative;

                    &::before {
                        position: absolute;
                        content: '⬝';
                        left: -10px;
                        color: white;
                    }
                }
            }
        }
    }

    .downloading {
        padding: 1rem;
    }

</style>