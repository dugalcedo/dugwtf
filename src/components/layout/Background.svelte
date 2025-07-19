<script lang="ts">
    import July2025Background from "../backgrounds/July2025Background.svelte";
    let screenWidth = $state(0)
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if screenWidth >= 700}
    <July2025Background />
{/if}