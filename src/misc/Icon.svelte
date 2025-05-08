<script lang="ts">
    const {
        name,
        alt,
        style = ""
    }:{
        name: string
        alt?: string
        style?: string
    } = $props()

    const altText = alt || `${name} icon`;
</script>

<img src="/icons/{name}.svg" alt={altText} style={style}>

<style>
    img {
        width: 16px
    }
</style>