<script lang="ts">
    import { type Dug } from "../../../lib/releases.js";
    import Dugpage from "./Dugpage.svelte";

    const { 
        data
    }: {
        data: {
            id: string
            dug: Dug | undefined
            prev: string | undefined
            next: string | undefined
        }
    } = $props();

</script>

<svelte:head>
    <title>{data.dug?.artist} - {data.dug?.title}</title>
    <meta name="description" content="The album '{data.dug?.title}' by {data.dug?.artist}. Ambient, noise, glitch, IDM, experimental electronic music. Download or play on bandcamp: {data.dug?.bc_link}">
    <meta property="music:musician" content="https://dug.wtf">
    <meta property="music:album" content="https://dug.wtf/dug/{data.dug?.id}">
</svelte:head>

{#if !data.dug}
    <div class="res">
        <h1 style="text-align: center;">ALBUM NOT FOUND</h1>
    </div>
{:else}
    <Dugpage dug={data.dug} prev={data.prev} next={data.next}  />
{/if}
