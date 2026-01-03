<script lang="ts">
    import NumberInput from "../../components/NumberInput.svelte";
    import { collageStore } from "./collage.svelte.js";

</script>

<div class="controls">
    <div class="head">
        <img src="/icons/eye.svg" alt="eye" style="filter: invert(1); width: 25px;">
        View options
    </div>
    <div class="body">
        <div class="control">
            <label for="collageViewControls_fontSize">Font size</label>
            <NumberInput id="collageViewControls_perRow" bind:value={collageStore.fontSize} min={6} max={24} />
        </div>
        
        <div class="control">
            <label for="collageViewControls_perRow">Per row</label>
            <NumberInput id="collageViewControls_perRow" bind:value={collageStore.perRow} min={1} max={8} />
        </div>
        
        <div class="control">
            <label for="collageViewControls_gap">gap</label>
            <NumberInput id="collageViewControls_gap" bind:value={collageStore.gap} min={0} max={15} />
        </div>
        <div class="control">
            <label for="collageViewControls_roundness">roundness</label>
            <NumberInput id="collageViewControls_roundness" bind:value={collageStore.roundness} min={0} max={50} step={3} />
        </div>
        <div class="control with-checkbox">
            <label for="collageViewControls_toSide">Titles to side</label>
            <input type="checkbox" id="collageViewControls_toSide" bind:checked={collageStore.titlesToSide}>
        </div>
        <div class="control with-checkbox">
            <label for="collageViewControls_extended">Extend width</label>
            <input type="checkbox" id="collageViewControls_extended" bind:checked={collageStore.extendedWidth}>
        </div>
    </div>
</div>

<style>
    .controls {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid white;
        
        & > .head {
            background-color: white;
            color: black;
            padding-left: 5px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        & > .body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            row-gap: .5rem;
            padding: 5px;
        }
    }

    .control {
        font-size: .8rem;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 2px;
    }

    .with-checkbox {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>