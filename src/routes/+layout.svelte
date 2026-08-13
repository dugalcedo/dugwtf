<script lang="ts">
    import "../lib/style/_main.scss";
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header/Header.svelte";
    import BcPlayer from "../components/layout/BcPlayer/BcPlayer.svelte";
    import DugPlayerNowPlaying from "./DugPlayerNowPlaying.svelte";
    import { page } from '$app/state'
    import handleNavigationAudio from "$lib/clientUtils/handleNavigationAudio.svelte";

    const {
        children,
    }: {
        children: Snippet;
    } = $props();

    const showMainLayout = $derived(!page.url.pathname.match(/^(\/portfolio)/gm))

    handleNavigationAudio()

</script>


{#if showMainLayout}
<Header />
{/if}

<main>
    {@render children()}
</main>

{#if showMainLayout}
<footer></footer>
<BcPlayer />
{/if}

<DugPlayerNowPlaying />

