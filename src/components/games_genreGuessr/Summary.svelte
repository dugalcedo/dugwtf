<script lang="ts">
    import { gg, scoreColor } from "../../lib/stores/gameStores/genreGuessr.svelte";

    const finalScore = $derived.by(() => {
        let sum = gg.scorecards.reduce((sum, sc) => {
            return sum + sc.score()
        }, 0)
        return sum/gg.scorecards.length
    })
</script>

<h3 style="margin-top: 1rem;">GAME OVER</h3>

<h3 style="margin-top: 1rem; color: var(--hl); border-bottom: 1px solid var(--hl); margin-bottom: 1rem;">SUMMARY</h3>

{#if !gg.samples}
    <p class="error">ERROR: the game has somehow been lost from memory</p>
{:else}
    <div id="SCORECARDS">
        {#each gg.samples as sample, i (sample.id)}
        {@const scorecard = gg.scorecards[i]}
            {#if !scorecard}
                <p class="error">ERROR: this scorecard has somehow been lost from memory</p>
            {:else}
            {@const score = scorecard.score()}
            {@const won = score > 0}
                <div class="scorecard">
                    <h4>
                        ROUND {i+1}: "{sample.genreName}" - 
                        <span style="color: {scoreColor(score)};">{score}%</span>
                    </h4>
                    {#if !won && sample.wrongGuesses?.length}
                        <div class="wrong-guesses">
                            <h5>your wrong guesses:</h5>
                            <span>{sample.wrongGuesses.join(', ')}</span>
                        </div>
                    {/if}
                </div>
            {/if}
        {/each}
        <div class="scorecard final">
            <h4>
                FINAL SCORE - 
                <span style="color: {scoreColor(finalScore)}">{finalScore.toFixed(2)}%</span>
            </h4>
        </div>
    </div>
{/if}

<p class="hl" style="margin-top: 2rem;">refresh to play again :)</p>

<style>
    .scorecard {

        &.final {
            font-size: xx-large;
        }
    }

    .wrong-guesses {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>