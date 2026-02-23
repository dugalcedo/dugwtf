<script lang="ts">
    import { gg, nextRound } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import type { Scorecard, GG_Sample } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import Summary from "./Summary.svelte";

    const scorecard = $derived<Scorecard | undefined>(gg.scorecards[gg.i])
    const sample = $derived<GG_Sample | undefined>(gg.samples?.[gg.i])
    const isLastRound = $derived(gg.i === 4)

</script>

{#if !scorecard || !sample}
    <h3 style="color: var(--error)">Something went wrong</h3>
    <p>This is the page where you're supposed to see the result of a round, but for some reason, the game status is not in memory, so refresh the page and start a new game.</p>
{:else}
    <h3>
        YOU {gg.status === 'won-round' ? "WON" : "LOST"}!
    </h3>
    <p>the name of the spotify tag was "{sample.genreName}"</p>
    {#if gg.status === 'won-round'}
        <p>your score for this round was {scorecard.score()}%</p>
    {:else}
        <p>you earned no points this round</p>
    {/if}

    {#if isLastRound}
        <Summary />
    {:else}
        <button onclick={nextRound} style="margin-top: 1rem;">
            next round
        </button>
    {/if}
{/if}