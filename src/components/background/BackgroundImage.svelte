<script lang="ts">

    import { getBg } from "./backgroundStore.svelte.js";

    const {
        name
    } : {
        name: string
    } = $props()

    const bg = getBg(name)

</script>

<img 
    src="/images/backgrounds/{name}.webp" 
    alt="background" 
    style="
        left: {bg.left}%;
        top: {bg.top}%;
        transition: left {bg.transitionLeft}ms linear, top {bg.transitionTop}ms linear;
        filter: invert({name === 'bg4' ? 1 : 0});
    "
/>

<style>
    img {
        position: absolute;
        translate: -50% -50%;
        height: 150vh;
        width: 150vw;
        mix-blend-mode: difference;
    }
</style>