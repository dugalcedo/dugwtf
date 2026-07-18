<script lang="ts">
    import WebSafeMooseEmoji from "./WebSafeMooseEmoji.svelte";
    import Tooltip from "../ui-thingies/Tooltip.svelte";

    const p: {
        artist: string
    } = $props()
</script>

<span title={p.artist}>
    {#if p.artist === 'Dew for Slug'}
        🦚<WebSafeMooseEmoji/>
    {:else if p.artist === 'Dug Alcedo'}
        <WebSafeMooseEmoji />
    {:else if p.artist === 'Trees and Flowers'}
        🦚
    {:else if p.artist === 'First Dog'}
        🐶
    {:else if p.artist === 'Loukas'}
        🦅
    {:else if p.artist === 'FDVCE'}
        🐣
    {:else if p.artist === 'FDVCE & Dylan Jones'}
        🐣🐭
    {/if}
</span>
