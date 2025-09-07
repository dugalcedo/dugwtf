<script lang="ts">
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header.svelte";
    import Background from "../components/layout/Background.svelte";
    import BandcampPlayer from "../components/BandcampPlayer.svelte";
    import NavigationForedrop from "../components/NavigationForedrop.svelte";
    import Modals from "../components/layout/Modals.svelte";

    const {
        children
    } : {
        children: Snippet
    } = $props()
</script>

<!-- You are inside of #app -->
<Background />
<NavigationForedrop />
<Modals />
<Header />
<main>
    {@render children()}
</main>
<BandcampPlayer />
