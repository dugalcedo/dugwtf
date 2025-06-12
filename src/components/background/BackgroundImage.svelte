<script lang="ts">


    const {
        name
    } : {
        name: string
    } = $props()



</script>

<img 
    src="/images/backgrounds/{name}.webp" 
    alt="background" 
    style="
        left: 0%;
        top: 0%;
        filter: invert({name === 'bg4' ? 1 : 0});
    "
/>

<style>
    img {
        position: absolute;
        height: 150vh;
        width: 150vw;
        mix-blend-mode: difference;
    }
</style>