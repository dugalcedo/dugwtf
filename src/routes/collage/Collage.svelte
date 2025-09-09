<script lang="ts">
    import { tick } from "svelte";
    import Album from "./Album.svelte";
    import { type List, type AlbumResult, collageStore } from "./collage.svelte.js";
    import html2canvas from "html2canvas";
    import AlbumTitle from "./AlbumTitle.svelte";

    const {
        collage
    }: {
        collage: List
    } = $props()

    const rows: AlbumResult[][] = $derived.by(() => {
        const albums = collage.albums.map((alb, i) => ({...alb, i}))
        const rows: AlbumResult[][] = []
        for (let i = 0; i < albums.length; i += collageStore.perRow) {
            rows.push(albums.slice(i, i + collageStore.perRow))
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

{#if !collage.albums.length}
    <p>You have no albums in this collage</p>
{:else}
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
                        <!-- TITLES -->
                        <div class="titles" style="font-size: {collageStore.fontSize}px">
                            <ul>
                                {#each row as album}
                                    <AlbumTitle {album} />
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
{/if}

<style>

    .row {
        & .titles {
            padding-left: 1.5rem;

            & ul {
                list-style-type: none;
            }
        }
    }

    .downloading {
        padding: 1rem;
    }

</style>