<script lang="ts">
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header.svelte";
    import Footer from "../components/layout/Footer.svelte";
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
<Footer />