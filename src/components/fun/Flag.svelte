<script lang="ts">
    import { stringToFlagImgUrl } from "./Flag";

    const {
        name,
        width = 25
    }: {
        name: string
        width?: number
    } = $props()
</script>

<img src={stringToFlagImgUrl(name)} alt="flag of {name}" width={width}>