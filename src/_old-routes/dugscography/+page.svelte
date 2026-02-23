<script lang="ts">
    import DugCard from "./DugCard.svelte";
    import dugs, { type Dug } from "../../_old-lib/releases.js";
    let years: Record<number, Dug[]> = {}
    dugs.forEach(dug => {
        if (!years[dug.year]) years[dug.year] = [];
        years[dug.year].push(dug)
    })
</script>

<svelte:head>
    <meta name="description" content="The discography of experimental electronic musician Dug Alcedo (formerly known as First Dog). Ambient, noise, glitch, IDM.">
</svelte:head>

<div class="dugscography res">
    {#each Object.entries(years).reverse() as [year, dugs]}
        {#if parseInt(year) > 2012}
            <h2 class="year">{year}</h2>
            <div class="year-dugs">
                {#each dugs as dug}
                    <DugCard {dug} />
                {/each}
            </div>
        {:else if year == "2012"}
            <h2 class="year">2012</h2>
            <div class="year-dugs">
                <DugCard dug={dugs.find(d => d.title === "Language from the Grip")!} />
            </div>
        {/if}
    {/each}
</div>

<style>
    .year-dugs {
        display: grid;
        gap: 8px;
        margin-bottom: 2rem;

        @media (min-width: 360px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (min-width: 475px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>