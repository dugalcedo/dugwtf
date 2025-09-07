<script lang="ts">
    import CollageTiered from "./CollageTiered.svelte";
    import CollageClassic from "./CollageClassic.svelte";

    let extendedWidth = $state(false)
</script>

<div class:res={!extendedWidth} id="collage-page">
    <div class="controls">
        <div class="field">
            <label for="collagePageControls_extendedWidth">Extended width</label>
            <input type="checkbox" id="collagePageControls_extendedWidth" bind:checked={extendedWidth}>
        </div>
    </div>

    <!-- <CollageTiered /> -->
    <CollageClassic />
</div>

<style>
    #collage-page {
        &:not(.res) {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>