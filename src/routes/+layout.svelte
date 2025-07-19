<script lang="ts">
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header.svelte";
    import Background from "../components/layout/Background.svelte";

    const {
        children
    } : {
        children: Snippet
    } = $props()
</script>

<!-- You are inside of #app -->
<Background />
<Header />
<main>
    {@render children()}
</main>
