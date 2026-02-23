<script lang="ts">
    import { PENALTIES, type GG_Sample, type Scorecard } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import CostTooltip from "./CostTooltip.svelte";
    import Audio from "./Audio.svelte";

    let { sample = $bindable(), scorecard = $bindable(), i }: {
        sample: GG_Sample
        scorecard: Scorecard
        i: number
    } = $props()

    const additionalSampleCount = $derived(sample.additionalSamples.length)
    const revealedSamples = $derived(sample.additionalSamples.filter(s => s.revealed))
    const revealedCount = $derived(revealedSamples.length)
    const canRevealMore = $derived.by(() => {
        return revealedCount < additionalSampleCount
    })
    const canAffordSample = $derived(scorecard.score() > PENALTIES.additionalSamplesRevealed)

</script>

<div id="ADDITIONAL-SAMPLES">
    {#if canRevealMore}
        {#if !canAffordSample}
            <p class="error" style="margin-bottom: .5rem;">you can't afford any more samples</p>
        {/if}
        <CostTooltip name="ADDITIONAL SAMPLE" cost={PENALTIES.additionalSamplesRevealed} {scorecard}>
            <button onclick={() => {
                const nextSample = sample.additionalSamples[revealedCount]
                if (!nextSample) return;
                nextSample.revealed = true;
                scorecard.additionalSamplesRevealed++
            }} style="margin-bottom: 1rem;" disabled={!canAffordSample}>
                Load additional sample (cost: 5%)
            </button>
        </CostTooltip>
    {:else}
        <p style="color: var(--error); margin-bottom: 1rem;">No additional samples to load.</p>
    {/if}
    <div id="samples">
        {#each revealedSamples as sample, i (sample.id)}
            <Audio bind:sample={revealedSamples[i]} bind:scorecard={scorecard} />
        {/each}
    </div>
</div>

<style>
    #samples {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
</style>