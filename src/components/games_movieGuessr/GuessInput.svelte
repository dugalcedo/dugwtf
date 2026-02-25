<script lang="ts">
    import { guess, handleBankrupt, mg } from "$lib/stores/gameStores/movieGuessr.svelte";
    import BuyButton from "./BuyButton.svelte";
</script>

<div id="GUESS_INPUT">
    <input 
        class="left"
        type="text" 
        class:signaling={mg.signalingWrongAnswer}
        placeholder="{mg.signalingWrongAnswer ? 'W R O N G    A N S W E R' : 'enter your guess here'}" 
        bind:value={mg.guessVal}
        onkeypress={e => {
            if (e.key !== 'Enter') return;
            if (mg.signalingWrongAnswer) return;
            guess()
        }}
    >
    <BuyButton name="wrongAnswer" />
    <button class="error no-flicker" onclick={handleBankrupt}>
        GIVE UP
    </button>
</div>

<style>
    #GUESS_INPUT {
        display: flex;
        gap: 2rem;
        margin-bottom: 1rem;

        & > .left {
            flex-grow: 1;

            &.signaling {
                outline: 3px dashed var(--error);
            }
        }
    }

    .error {
        border-color: var(--error);
    }
</style>