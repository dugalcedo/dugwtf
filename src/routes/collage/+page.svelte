<script lang="ts">
    import CollageTiered from "./CollageTiered.svelte";
    import CollageClassic from "./CollageClassic.svelte";
    import Toggle from "../../components/Toggle.svelte";
    import NumberInput from "../../components/NumberInput.svelte";

    let extendedWidth = $state(false)
    let collageType: "classic" | "tiered" = $state("classic")
    let titlesFontSize = $state(12)
    let perRow = $state(4)
    let titlesToSide = $state(true)

</script>

<div class:res={!extendedWidth} class:extend={extendedWidth} id="collage-page">

    {#if collageType === 'classic'}
        <CollageClassic {perRow} {titlesFontSize} {titlesToSide} {collageType} />
    {:else}
        <CollageTiered {perRow} {titlesFontSize} {titlesToSide} {collageType} />
    {/if}

    <div class="controls">
        <div class="field">
            <label for="collagePageControls_extendedWidth">Extended width</label>
            <input type="checkbox" id="collagePageControls_extendedWidth" bind:checked={extendedWidth}>
        </div>
        <div class="field">
            <span>Collage type</span>
            <Toggle 
                bind:value={collageType}
                options={[
                    { value: 'classic', text: 'classic' },
                    { value: 'tiered', text: 'tiered' },
                ]}
            />
        </div>
        <div class="field">
            <label for="classicCollageControls_fontSize">Font size</label>
            <NumberInput
                bind:value={titlesFontSize}
                min={6}
                max={25}
                step={1}
                id="classicCollageControls_fontSize"
            />
        </div>
        <div class="field">
            <label for="classicCollageControls_perRow">Per row</label>
            <NumberInput
                id="classicCollageControls_perRow"
                bind:value={perRow}
                min={1}
                max={8}
            />
        </div>
        <div class="field">
            <label for="classicCollageControls_titlesToSide">Titles to side</label>
            <input type="checkbox" id="classicCollageControls_titlesToSide" bind:checked={titlesToSide}>
        </div>
    </div>
</div>

<style>
    .controls {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        font-size: .8rem;
        padding: 1.5rem 0;
    }

    .field {
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: .5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    #collage-page {
        &:not(.res) {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        &.extend {
            width: 1400px;
            max-width: 100%;
            margin: auto;
        }
    }
</style>