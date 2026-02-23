<script lang="ts">
    import Blanks from "./Blanks.svelte";
    import Audio from "./Audio.svelte";
    import AdditionalSamples from "./AdditionalSamples.svelte";
    
    import type { GG_Sample, Scorecard } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import { gg, handleLose, PENALTIES } from "../../lib/stores/gameStores/genreGuessr.svelte";

    let { sample = $bindable(), scorecard = $bindable(), i }: {
        sample: GG_Sample
        scorecard: Scorecard
        i: number
    } = $props()

    const score = $derived(scorecard.score())

    $effect(() => {
        if (gg.status == 'started' && score <= 0) {
            handleLose()
        }
    })

    // const dev = $derived(JSON.stringify({ sample, scorecard, i }, null, 2))

</script>

<Blanks {i} bind:scorecard={scorecard} {sample} />

<div style="display: flex;">
    <button class="give-up-btn" style="margin: .5rem 0;" onclick={() => {
        scorecard.artistsRevealed = 1000
    }}>
        GIVE UP
    </button>
</div>

<div id="AUDIOS">
    <h3>samples</h3>
    <p class="sample-warning">
        after your first 10 seconds of listening, each second costs {PENALTIES.secondsSpentListening}%
    </p>
    {#if scorecard.secondsSpentListening < 10}
        <p style="margin-bottom: 1rem; font-size: .8rem; text-transform: uppercase;">
            you have <span class="warning">{10 - scorecard.secondsSpentListening}</span> seconds left before you will start losing points
        </p>
    {:else}
        <p class="error">
           YOU ARE NOW LOSING POINTS FOR YOUR LISTENING 
        </p>
    {/if}

    <div id="MAIN_AUDIO">
        <Audio bind:sample={sample} bind:scorecard={scorecard} />
    </div>
    <AdditionalSamples {i} bind:scorecard={scorecard} bind:sample={sample} />
</div>

<!-- <pre style="font-size: 12px;">
{dev}
</pre> -->


<style>
    #AUDIOS {
        & > h3 {
            color: var(--hl);
            border-bottom: 1px dashed var(--hl);
        }
    }

    .give-up-btn {
        border-color: var(--error);
        color: var(--error);
    }

    .sample-warning {
        color: var(--warning);
        font-style: italic;
        font-size: .8rem;
    }

    #MAIN_AUDIO {
        margin-bottom: 1rem;
    }
</style>