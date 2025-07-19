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

{#if !data.dug}
    <div class="res">
        <h1 style="text-align: center;">ALBUM NOT FOUND</h1>
    </div>
{:else}
    <Dugpage dug={data.dug} prev={data.prev} next={data.next} />
{/if}
