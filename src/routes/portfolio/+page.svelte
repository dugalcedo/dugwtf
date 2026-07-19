<script lang="ts">
    import { portfolioItems } from "./portfolio";
    import PortfolioItem from "./PortfolioItem.svelte";
</script>

<svelte:head>
    <title>Doug Alcedo's portfoliio</title>
</svelte:head>

<dl id="PORTFOLIO_ITEMS">
    {#each portfolioItems as item}
        <PortfolioItem {item} />
    {/each}
</dl>

<style>
    #PORTFOLIO_ITEMS {
        width: 1000px;
        max-width: 95%;
        margin-left: auto;
        margin-right: auto;
    }
</style>