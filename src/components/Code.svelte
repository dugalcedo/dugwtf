<script lang="ts">
    import { onMount } from "svelte";
    import LoadingDots from "./LoadingDots.svelte";

    const { path }: { path: string } = $props()

    let loading = $state(true)
    let error = $state(false)
    let text = $state("")

    onMount(async () => {
        const res = await fetch(path)

        if (!res.ok) {
            error = true
            return
        }

        let _text = await res.text()
        _text = _text.replaceAll('<','&lt;').replaceAll('>','&gt;')

        text = _text
        loading = false
    })
</script>

{#if text}
<code><pre>{@html text}</pre></code>
{:else if error}
<p>ERROR LOADING CODE</p>
{:else if loading}
<LoadingDots />
{/if}

<style>
    pre {
        background-color: black;
        color: #75e275;
        padding: .5rem;
        font-size: .8rem;
    }
</style>
