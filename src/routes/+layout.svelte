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

<svelte:head>
    <title>Dug Alcedo - experimental electronic music</title>
    <meta name="description" content="Ambient, noise, glitch, IDM, experimental electronic music.">
    <meta property="music:musician" content="https://dug.wtf">
</svelte:head>

<!-- You are inside of #app -->
<Background />
<NavigationForedrop />
<Header />
<main>
    {@render children()}
</main>
<BandcampPlayer />
