<script lang="ts">
    import { gg } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import type { Scorecard } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import ScoreChip from "./ScoreChip.svelte";

    const round = $derived<Scorecard | undefined>(gg.scorecards[gg.i])
</script>

{#if round}
    <div id="ROUND">
        <h4>ROUND {gg.i+1}/5</h4>

        <div id="seconds">
            <span>seconds listened: {round.secondsSpentListening}</span>
        </div>

        <div id="score">
            possible score: 
            <div class="score-chip-container">
                <ScoreChip score={round.score()} />
                {#if gg.costTooltip}
                    <div class="cost-tooltip" style="
                        text-align: left;
                        position: absolute;
                        top: 50%;
                        translate: 0 -50%;
                        left: calc(100% + 1rem);
                        min-width: 6rem;
                        color: {gg.costTooltip.color};
                        font-size: smaller;
                    ">
                        <p>=&gt; {gg.costTooltip.newScore.toFixed(2)}%</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    #ROUND {
        position: relative;
        background-color: var(--bg1);
        padding: .5rem;
    }

    #seconds {
        font-size: .7rem;
    }

    #score {
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        position: relative;
    }

</style>