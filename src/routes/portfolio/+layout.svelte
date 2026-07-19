<script lang="ts">
    import { type Snippet } from "svelte";
    const { children }: { children: Snippet } = $props()
</script>

<svelte:head>
    <title>Doug Alcedo's portfolio</title>
</svelte:head>

{@render children()}