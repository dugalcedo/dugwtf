<script lang="ts">
    import { cgState } from "./cgState.svelte";

    const corr_arr = $derived(Array.from({ length: cgState.correctGuesses }))
    const arr = $derived(Array.from({ length: cgState.init.allowedIncorrectGuesses }))

</script>


<div id="METERS">
    <div class="incorrect-guess-meter">
        {#each arr as _, i}
            <span class:red={i < cgState.incorrectGuesses}>
                X
            </span>
        {/each}
    </div>
    <div class="correct-guess-meter">
        {#each corr_arr as _}
            <span class="corr"></span>
        {/each}
    </div>
</div>

<style>
    #METERS {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .correct-guess-meter {
        display: flex;
        gap: 3px;
    }

    .corr {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: lime;
    }

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