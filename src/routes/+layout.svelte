<script lang="ts">
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header.svelte";
    import Background from "../components/layout/Background.svelte";
    import BandcampPlayer from "../components/BandcampPlayer.svelte";
    import NavigationForedrop from "../components/NavigationForedrop.svelte";

    const {
        children
    } : {
        children: Snippet
    } = $props()
</script>

<!-- You are inside of #app -->
<Background />
<NavigationForedrop />
<Header />
<main>
    {@render children()}
</main>
<BandcampPlayer />
