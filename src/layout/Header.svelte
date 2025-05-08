<script lang="ts">
    import { openDrawer } from "../stores/layoutStore.svelte.js";
</script>

<header>
    <button class="logo" onclick={openDrawer}>
        <img src="/images/moose-stamp.png" alt="moose">
    </button>
    <h1>Dug Alcedo</h1>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px;
    }

    .logo {
        padding: 0;
        border: 0;
    }

    .logo img {
        filter: invert(1) brightness(80%) saturate(300%) sepia(1) hue-rotate(100deg);
        width: 60px;
        image-rendering: crisp-edges;
    }

    h1 {
        font-size: 18px;
        text-shadow: 3px 3px 0px var(--semidarkgray);
    }
</style>