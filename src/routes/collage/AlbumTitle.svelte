<script lang="ts">
    import { changeAlbumName, collageStore, type AlbumResult } from "./collage.svelte.js";
    const { album }: { album: AlbumResult } = $props() 

    let textarea: null | HTMLTextAreaElement = $state(null)

    $effect(() => {
        textarea?.focus()
    })
</script>

<li>
    {#if collageStore.changingNameIndex == album.i}
        <textarea 
            value={album.title}
            onkeyup={(e) => {
                if (e.key === 'Enter') {
                    changeAlbumName(album, e.currentTarget.value.trim())
                }
                if (e.key === 'Escape') {
                    collageStore.changingNameIndex = undefined
                }
            }} 
            bind:this={textarea}
        ></textarea>
    {:else}
        <button onclick={() => collageStore.changingNameIndex = album.i}>
            {album.title}
        </button>
    {/if}
</li>

<style>
    li {
        position: relative;

        &::before {
            position: absolute;
            content: '⬝';
            left: -10px;
            color: white;
        }
    }

    button {
        font-size: 1em;
        border: 0;
        padding: 0;
        text-align: left;
    }

    textarea {
        font-size: inherit;
        width: 100%;
        resize: none;
        height: 8ch;
    }
</style>