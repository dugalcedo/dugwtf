<script lang="ts">
    import NumberInput from "../../components/NumberInput.svelte";
    import { type AtomInteraction, type Color, type SubstrateSettings } from "./engine.js";
    import { miniUID, randRange } from "../../lib/index.js";
    let { 
        settings,
        apply
    }: { 
        settings: SubstrateSettings,
        apply: (newSettings: SubstrateSettings) => void
    } = $props()

    const formData = $state(structuredClone(settings))

    const handleApply = () => {
        const newSettings = structuredClone($state.snapshot(formData))

        apply(newSettings)
    }

    const addColor = () => {
        const newColor: Color = {
            name: miniUID(),
            value: "#ffffff",
            size: 4,
            prevalence: 1 / formData.colors.length+1,
            interactions: {}
        }

        const colorNames = [...formData.colors.map(c => c.name), newColor.name]

        colorNames.forEach(name => {
            newColor.interactions[name] = {
                gravity: Number(randRange(0, 1).toFixed(3))
            }
        })

        formData.colors.forEach(color => {
            color.prevalence = 1 / formData.colors.length+1;
            color.interactions[newColor.name] = {
                gravity: Number(randRange(0, 1).toFixed(3))
            }
        })

        formData.colors.push(newColor)
    }

</script>

<form onsubmit={e => {
    e.preventDefault()
    handleApply()
}}>
    <div class="head">
        <h3>Settings</h3>
        <button>
            APPLY
        </button>
    </div>
    <div class="body">
        <div class="field">
            <label for="a1-count">Atom count</label>
            <NumberInput
                id="a1-count"
                bind:value={formData.atomCount}
                min={25}
                max={1000}
                step={25}
            />
        </div>
        <fieldset class="colors">
            {#each formData.colors as color, i (color)}
                <div class="color">
                    <div class="field">
                        <label for="atom-color-{i}">Color</label>
                        <input type="color" bind:value={formData.colors[i].value} id="atom-color-{i}">
                    </div>
                    <fieldset class="interactions">
                        {#each formData.colors as color2, j (color2)}
                            <div class="field">
                                <label class="interaction-label" for="atom-gravity-{i}-{j}">
                                    <span class="color-badge" style="background-color: {color2.value};"></span>
                                    G
                                </label>
                                <input
                                    type="number"
                                    bind:value={formData.colors[i].interactions[color2.name].gravity}
                                    min={0}
                                    max={1}
                                    step={0.001}
                                >
                            </div>
                        {/each}
                    </fieldset>
                </div>
            {/each}
            <!-- <button onclick={addColor} type="button">
                ADD COLOR
            </button> -->
        </fieldset>
    </div>
    <div class="foot">
        <button>
            APPLY
        </button>
    </div>
</form>

<style>
    .colors {
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: .5rem;
    }

    .color {
        background-color: rgba(255, 255, 255, 0.05);
        padding: .5rem;
    }

    .interaction-label {
        display: flex;
        align-items: center;
        gap: 1rem;

        & > span {
            display: inline-block;
            width: 25px;
            height: 25px;
        }
    }

    form > .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    form > .body {
        font-size: .8rem;
        padding: 0 1rem;
    }

    fieldset {
        border: 0;
    }
</style>