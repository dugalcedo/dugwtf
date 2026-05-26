<script lang="ts">
    const { tech }: { tech: string } = $props()
    import Tooltip from "../../components/ui-thingies/Tooltip.svelte";
</script>


<Tooltip class="tech-badge" tip={tech} side="bottom" align="end">
    <img src="/icons/tech/{tech}.svg" alt="{tech}">
</Tooltip>


<style>
    img {
        font-size: .7rem;
        width: 30px;
    }
</style>