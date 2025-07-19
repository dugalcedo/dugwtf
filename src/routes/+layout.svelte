<script lang="ts">
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header.svelte";

    const {
        children
    } : {
        children: Snippet
    } = $props()
</script>

<!-- You are inside of #app -->
<Header />
<main>
    {@render children()}
</main>

<style>
    main {
        padding: 1rem 0;
    }
</style>