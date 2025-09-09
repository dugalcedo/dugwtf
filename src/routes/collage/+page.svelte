<script lang="ts">
    import Collage from "./Collage.svelte";
    import { collageStore } from "./collage.svelte.js";
    const collage = $derived(collageStore.data.collages.find(col => col.name == collageStore.selectedCollage))

</script>

{#if !collage}
    <p>Select a collage</p>
{:else}
    <Collage {collage} />
{/if}