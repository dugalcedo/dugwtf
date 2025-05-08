<script lang="ts">
    const {
        name,
        alt
    }:{
        name: string
        alt?: string
    } = $props()

    const altText = alt || `${name} icon`;
</script>

<img src="/icons/{name}.svg" alt={altText}>

<style>
    img {
        width: 16px
    }
</style>