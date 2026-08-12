<script lang="ts">
    import AreaSelector from "./AreaSelector.svelte";
    import BigNumberInput from "./BigNumberInput.svelte";
    import { cgState } from "./cgState.svelte";
    import Flag from "../../../components/fun/Flag.svelte";
    import { PRESETS, PRESET_FLAGS, applyPreset, storeMatchesPreset } from "./presets.svelte";
   
</script>

<section id="SETTINGS_CONTAINER">
    <div id="SETTINGS-PRESETS">
        <h3>Presets</h3>
        <div class="preset-groups">
            {#each Object.entries(PRESETS) as [areaName, levels]}
            {@const flagPlaces = PRESET_FLAGS[areaName]}
            <fieldset class="preset-group">
                <h4>
                    <span class="flags">
                        {#each flagPlaces as place}
                            <Flag name={place} />
                        {/each}
                    </span>
                    {areaName}
                </h4>
                <div class="buttons">
                    {#each Object.entries(levels) as [difficultyName, preset]}
                    {@const active = storeMatchesPreset(preset)}
                        <button
                            class="no-flicker"
                            class:active={active}
                            onclick={() => applyPreset(preset)}
                        >
                            {difficultyName}
                        </button>
                    {/each}
                </div>
            </fieldset>
            {/each}
        </div>
    </div>
    
    <div id="SETTINGS">
        <div class="field">
            <label>
                <h4>min population</h4>
                <p class="small">leave empty for no minimum</p>
                <BigNumberInput
                    min={0}
                    max={cgState.init.cityOpts.maxPop}
                    emptyValue={0}
                    displayedEmptyValue="none"
                    bind:value={cgState.init.cityOpts.minPop}
                />
            </label>
        </div>
        <div class="field">
            <label>
                <h4>max population</h4>
                <p class="small">leave empty for no maximum</p>
                <BigNumberInput
                    min={cgState.init.cityOpts.minPop}
                    max={100_000_000}
                    emptyValue={Infinity}
                    displayedEmptyValue="none"
                    bind:value={cgState.init.cityOpts.maxPop}
                />
            </label>
        </div>
        <div class="field">
            <h4>number of cities</h4>
            <input
                type="number"
                min={3}
                max={15}
                step={1}
                bind:value={cgState.init.length}
            >
        </div>
        <div class="field">
            <h4>max incorrect guesses</h4>
            <input
                type="number"
                min={1}
                max={20}
                step={1}
                bind:value={cgState.init.allowedIncorrectGuesses}
            >
        </div>
        <AreaSelector type="countries" />
        <AreaSelector type="continents" />
    </div>
</section>

<style>

    #SETTINGS_CONTAINER {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        flex-grow: 1;
        overflow-y: auto;
    }

    .preset-groups {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: start;

        & > .preset-group {
            padding: 0;
            flex-grow: 1;

            & h4 {
                background-color: var(--fg1);
                color: var(--bg1);
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                & .flags {
                    display: flex;
                    align-items: start;
                    gap: 5px;
                    max-width: 150px;
                    flex-wrap: wrap;
                }
            }


            & > .buttons {
                display: flex;
                flex-direction: column;
                
                & > button {
                    padding: .25rem;
                    font-size: .7rem;
                    flex-grow: 1;
                    filter: grayscale(1);

                    &.active {
                        filter: unset;
                        background-color: var(--hl);
                        color: var(--bg1);
                    }
                }
            }
        }
    }


    #SETTINGS {
        display: flex;
        flex-wrap: wrap;
        align-content: start;
        align-items: start;
        gap: 1rem;

        :global(& > *) {
            padding: .5rem;
            background-color: var(--bg1);
        }
    }
</style>

