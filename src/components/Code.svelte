<script lang="ts">
    import { onMount } from "svelte";
    import LoadingDots from "./LoadingDots.svelte";

    const { path, copyBtn = false }: { path: string, copyBtn?: boolean } = $props()

    let loading = $state(true)
    let error = $state(false)
    let text = $state("")
    let copiedMsgShown = $state(false)

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

    const handleCopy = async () => {
        copiedMsgShown = true
        window.navigator.clipboard.writeText(text)

        setTimeout(() => {
            copiedMsgShown = false
        }, 1500);
    }
</script>

{#if text && !error}
<code><pre>{@html text}</pre></code>
{#if copyBtn}
    <button 
        onclick={handleCopy} 
        class="copy-btn" 
        disabled={copiedMsgShown}
    >
        {#if copiedMsgShown}
            copied :&rpar;
        {:else}
            COPY
        {/if}
    </button>
{/if}
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

    .copy-btn {
        width: 100%;
        background-color: lime;
        color: black;

        &:hover {
            background-color: rgb(0, 143, 0);
            color: white;
        }

        &:active {
            background-color: black;
            color: lime;
        }

        &:disabled {
            background-color: gray;
            color: lightgray;
        }
    }
</style>
