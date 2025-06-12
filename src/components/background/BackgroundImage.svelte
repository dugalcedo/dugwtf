<script lang="ts">

    import { onMount } from "svelte";

    const {
        name
    } : {
        name: string
    } = $props()

    const randRange = (min: number, max: number) => Math.random()*(max-min)+min;

    let tx = $state(-50);
    let ty = $state(-50);
    let tDuration = $state(1000);
    let timeout = $state<any>()

    const move = () => {
        tx = randRange(-60, -40)
        ty = randRange(-60, -40)
        tDuration = randRange(2000, 10000)

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            move()
        }, tDuration);
    }

    onMount(() => {
        setTimeout(() => {
            move()
        }, 100);
    })

</script>

<img 
    src="/images/backgrounds/{name}.webp" 
    alt="background" 
    style="
        left: 50%;
        top: 50%;
        transform: translate({tx}%, {ty}%) scaleZ(1);
        transition: transform {tDuration}ms;
    "
/>

<style>
    img {
        position: absolute;
        height: 150vh;
        width: 150vw;
        opacity: 0.02;
    }
</style>