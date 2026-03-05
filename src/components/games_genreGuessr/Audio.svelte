<script lang="ts">
    import type { GG_Sample, Scorecard, GG_Additional_Sample } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import { PENALTIES } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import { AudioTimeTracker } from "../../lib/clientUtils/AudioTimeTracker";
    import { onMount } from "svelte";
    import CostTooltip from "./CostTooltip.svelte";

    const { sample = $bindable(), scorecard = $bindable() }: {
        sample: GG_Sample | GG_Additional_Sample
        scorecard: Scorecard
    } = $props()

    let el: HTMLAudioElement | null = $state(null)
    const score = $derived(scorecard.score())
    const canAffordArtist = $derived(score > PENALTIES.artistRevealed);
    const canAffordTitle = $derived(score > PENALTIES.titleRevealed);
    const canAffordToListen = $derived(score > PENALTIES.secondsSpentListening);

    onMount(() => {
        // check saved volume
        const lsVolume = localStorage.getItem('dugwtf|ggvolume')
        if (lsVolume !== null) {
            let volume = Number(lsVolume)
            if (volume < 0.1) volume = 0.1
            el!.volume = volume
        }

        new AudioTimeTracker(el!, {
            onSecondIncrement() {
                if (!canAffordToListen) {
                    el!.pause()
                    return
                }
                scorecard.secondsSpentListening++
            }
        })

        el!.addEventListener('volumechange', () => {
            localStorage.setItem('dugwtf|ggvolume', el!.volume.toString())
        })
    })
</script>

<div id="GG_AUDIO">
    <CostTooltip name="PER SECOND" cost={PENALTIES.secondsSpentListening} {scorecard}>
        <audio controls bind:this={el} class:disabled={!canAffordToListen}>
            <source src={sample.url}>
        </audio>
    </CostTooltip>
    <div id="reveals">
        {#if sample.aritstRevealed}
            <p>Artist: {sample.artist}</p>
        {:else}
            <CostTooltip name="REVEAL ARTIST" cost={PENALTIES.artistRevealed} {scorecard}>
                <button onclick={() => {
                    sample.aritstRevealed = true
                    scorecard.artistsRevealed ++
                }} disabled={!canAffordArtist}>
                    Reveal artist (costs {PENALTIES.artistRevealed}%)
                </button>
            </CostTooltip>
        {/if}
        {#if sample.titleRevealed}
            <p>Title: {sample.title}</p>
        {:else}
            <CostTooltip name="REVEAL TITLE" cost={PENALTIES.titleRevealed} {scorecard}>
                <button onclick={() => {
                    sample.titleRevealed = true
                    scorecard.titlesRevealed ++
                }} disabled={!canAffordTitle}>
                    Reveal title (costs {PENALTIES.titleRevealed}%)
                </button>
            </CostTooltip>
        {/if}
    </div>
</div>

<style>
    #GG_AUDIO {
        display: inline-flex;
        padding: 1rem;
        align-items: center;
        gap: 1rem;
        background-color: var(--fgo10);

        &:has(audio.disabled) {
            cursor: not-allowed;
        }
    }

    audio.disabled {
        opacity: 0.5;
        filter: blur(3px);
        pointer-events: none;
    }

    #reveals {
        display: flex;
        gap: .5rem;
        flex-direction: column;

        & button {
            font-size: .8em;
            width: 100%;
        }
    }
</style>