<script lang="ts">
    import '../lib/style/_main.css'
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header/Header.svelte";
    import BcPlayer from '../components/layout/BcPlayer/BcPlayer.svelte';

    const {
        children
    }: {
        children: Snippet
    } = $props()
</script>

<Header />

<main>
    {@render children()}
</main>

<footer>

</footer>

<BcPlayer />