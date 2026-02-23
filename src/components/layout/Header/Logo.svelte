<script lang="ts">
    import { onMount } from "svelte";

    let deg = $state(0)

    onMount(() => {
        setInterval(() => {
            deg = randRange(-10, 10)
        }, 3000);
    })

    function randRange(min: number, max: number) {
        return Math.floor(Math.random() * (max-min)) + min
    }
</script>

<img 
    id="LOGO" 
    class="invert-on-dark" 
    src="/images/moose-stamp.png" 
    alt="cartoon moose"
    style="
        transform: rotate({deg}deg);
    "
>

<style>
    #LOGO {
        width: 150px;
    }
</style>