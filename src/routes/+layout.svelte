<script lang="ts">
    import '../lib/style/_main.css'
    import type { Snippet } from "svelte";
    import Header from "../components/layout/Header/Header.svelte";
    import BcPlayer from '../components/layout/BcPlayer/BcPlayer.svelte';
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    const {
        children
    }: {
        children: Snippet
    } = $props()

    onMount(() => {
        console.log("PAGE DATA:", page.data)
    })
</script>

<Header />

<main>
    {@render children()}
</main>

<footer>

</footer>

<BcPlayer />