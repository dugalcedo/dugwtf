<script lang="ts">
    import { tick } from "svelte";
    import Atom1 from "./Atom1.svelte";
    import { type AtomInteraction, type Color, type SubstrateSettings } from "./engine.js";
    import Atom1Form from "./Atom1Form.svelte";
    import { randRange } from "../../lib/index.js";

    let warningShown = $state(true)
    let on = $state(true)
    let autoRandomize = $state(true)
    let autoRandomizeInterval = $state(5)
    let timeRemaining = $state(5)
    let autoRandomizeIntervalObj = $state<any>()

    function stopInterval() {
        clearInterval(autoRandomizeIntervalObj)
    }

    function startInterval() {
        clearInterval(autoRandomizeIntervalObj)
        autoRandomizeIntervalObj = setInterval(() => {
            timeRemaining--
            if (timeRemaining <= 0) {
                randomize()
                timeRemaining = autoRandomizeInterval
            }
        }, 1000)
    }

    async function resetInterval() {
        stopInterval()
        await tick()
        startInterval()
    }

    const reset = async () => {
        on = false
        await tick()
        on = true
    }

    const randomize = async () => {
        for (let i = 0; i < settingsColors.length; i++) {
            for (const color in settingsColors[i].interactions) {
                const int = settingsColors[i].interactions[color]
                int.gravity = Number(randRange(0, 1).toFixed(3))
            }
        }
        reset()
    }

    let initialColors = [
        { name: 'orange', value: '#ffa500' },
        { name: 'green', value: '#00ff7f' },
        { name: 'lightblue', value: '#00bfff' },
        { name: 'blue', value: '#0000ff' },
        { name: 'magenta', value: '#ff1493' },
    ]

    let settingsColors = $state(initialColors.map(c => {
        const color: Color = {
            ...c,
            size: 4,
            prevalence: Number((1/initialColors.length).toFixed(2)),
            interactions: initialColors.reduce((int, {name}) => {
                int[name] = {
                    gravity: Number(randRange(0, 1).toFixed(3))
                }

                return int
            }, {} as Record<string, AtomInteraction>) 
        }
        return color
    }))

    let atomCount = $state(500)

    const settings = $derived({
        colors: settingsColors,
        atomCount
    })

    startInterval()

</script>

<div class="res">
    {#if warningShown}
        <p class="warn">EPILEPSY WARNING</p>
        <p class="flash">rapid, strobe-like visual effects</p>
        <div class="okay-c">
            <button class="okay" onclick={() => {
                warningShown = false
            }}>
                I'll be okay
            </button>
        </div>
    {:else if on}
        <div class="controls">
            <button onclick={reset}>
                Reset
            </button>
            <button onclick={randomize}>
                Randomize
            </button>
            <div>
                <label for="atom-auto-randomize">Auto</label>
                <input type="checkbox" checked={autoRandomize} onchange={e => {
                    autoRandomize = e.currentTarget.checked
                    if (!autoRandomize) stopInterval();
                    else resetInterval()
                }}>
                {#if autoRandomize}
                    <input 
                        type="number" 
                        aria-label="auto randomize interval in seconds" 
                        value={autoRandomizeInterval} 
                        oninput={e => {
                            autoRandomizeInterval = Number(e.currentTarget.value)
                            resetInterval()
                        }}
                        min={3} max={60} step={1}
                        style="width: 60px"
                    >
                    <span>secs</span>
                {/if}
            </div>
        </div>
        <Atom1 {settings} />

        {#if autoRandomize}
            <div class="countdown">
                New atoms in {timeRemaining} seconds
            </div>
        {/if}

        <Atom1Form 
            settings={structuredClone($state.snapshot(settings))}
            apply={(newSettings) => {
                atomCount = newSettings.atomCount
                settingsColors = newSettings.colors
                reset()
            }}
        />
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

    .controls {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        & > div {
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }

    .countdown {
        text-align: center;
        padding-bottom: 1rem;
        color: aquamarine;
        font-size: 1.2rem;
    }
</style>