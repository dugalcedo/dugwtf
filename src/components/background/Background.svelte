<script lang="ts">
    import BackgroundImage from "./BackgroundImage.svelte";
</script>

<div id="background">
    <BackgroundImage name="bg1" />
    <BackgroundImage name="bg2" />
    <BackgroundImage name="bg3" />
    <BackgroundImage name="bg4" />
</div>

<style>
    #background {

        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
    }

</style>