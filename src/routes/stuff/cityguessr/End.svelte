<script lang="ts">
    import Answers from "./Answers.svelte";
    import { cgState } from "./cgState.svelte";

    const won = $derived.by(() => {
        return cgState.correctGuesses >= cgState.init.length
    })
</script>

{#if won}
<p>You won!</p>
{:else}
<p>You lost.</p>
{/if}

<button onclick={() => cgState.status = 'not-started'}>RESET</button>

<Answers />
