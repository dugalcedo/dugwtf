<script lang="ts">
    import { tick } from "svelte";
    import Atom1 from "./Atom1.svelte";
    import NumberInput from "../../components/NumberInput.svelte";

    let LIFETIME = $state(10)

    let warningShown = $state(true)
    let on = $state(true)
    let newAtomIn = $derived(LIFETIME)

    let colors = $state(['#ffa500', '#00ff7f', '#00bfff', '#0000ff', '#ff1493'])

    function startCountdown() {
        setInterval(async () => {
            newAtomIn--
            if (newAtomIn <= 0) {
                newAtomIn = LIFETIME
                on = false
                await tick()
                on = true
            }
        }, 1000)
    }

</script>

<div class="res">
    {#if warningShown}
        <p class="warn">EPILEPSY WARNING</p>
        <p class="flash">rapid, strobe-like visual effects</p>
        <div class="okay-c">
            <button class="okay" onclick={() => {
                warningShown = false
                startCountdown()
            }}>
                I'll be okay
            </button>
        </div>
    {:else if on}
        <div class="controls">
            <label for="atom1_interval">Interval (s)</label>
            <NumberInput 
                bind:value={LIFETIME}
                min={3}
                max={60}
                step={1}
            />
        </div>
        <p class="new-atom-in">
            new atom in.. {newAtomIn}
        </p>
        <Atom1 {colors} />
    {/if}
</div>

<style>
    .warn {
        font-size: 2rem;
        text-align: center;
        color: yellow;
        font-weight: bold;
        margin-top: 2rem;
    }

    .flash {
        text-align: center;
    }

    .okay-c {
        text-align: center;
    }

    .okay {
        background-color: gray;
        margin-top: 1rem;
    }

    .new-atom-in {
        text-align: center;
        padding-top: 2rem;
        font-size: 1.5rem;
        color: aquamarine;
    }
    
    .controls {
        width: 250px;
        text-align: center;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
</style>