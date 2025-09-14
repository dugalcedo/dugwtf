<script lang="ts">
    import type { Snippet } from "svelte";
    const { children }: { children: Snippet } = $props()
</script>


<div class="res">
    <p>Blog layout</p>
    {@render children()}
</div>