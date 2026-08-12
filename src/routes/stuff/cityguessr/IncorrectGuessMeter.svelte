<script lang="ts">
    import { cgState } from "./cgState.svelte";

    const arr = $derived(Array.from({ length: cgState.init.allowedIncorrectGuesses }))
</script>

<div class="incorrect-guess-meter">
    {#each arr as _, i}
        <span class:red={i < cgState.incorrectGuesses}>
            X
        </span>
    {/each}
</div>

<style>
    .incorrect-guess-meter {
        & span {
            opacity: 0.5;

            &.red {
                opacity: 1;
                color: red;
            }
        }
    }
</style>