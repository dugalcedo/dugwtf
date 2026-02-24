<script lang="ts">
    const {
        poster
    } : {
        poster: string
    } = $props()

    let imgWidth: number = $state(0)
    let imgHeight: number = $state(0)
</script>

<div class="blurry-poster" style="
    width: {imgWidth}px;
    height: {imgHeight}px;
    overflow: hidden;
    cursor: not-allowed;
">
    <img 
        src={poster} 
        alt="blurry movie poster" 
        style="
            filter: blur(8px) grayscale(0.67); 
            pointer-events: none; 
            user-select: none;
            max-width: 200px;
        "
        bind:offsetHeight={imgHeight}
        bind:offsetWidth={imgWidth}
    >
</div>