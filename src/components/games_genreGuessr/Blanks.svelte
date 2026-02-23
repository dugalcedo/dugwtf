<script lang="ts">
    import type { GG_Sample, Scorecard } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import { handleWin, PENALTIES, notify } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import CostTooltip from "./CostTooltip.svelte";

    let { sample, scorecard = $bindable(), i }: {
        sample: GG_Sample
        scorecard: Scorecard
        i: number
    } = $props()

    let input = $state<HTMLInputElement | null>(null)
    let inputValue = $state("")
    let spamProtect = $state(false)
    const canAffordLetter = $derived(scorecard.score() > scorecard.lettercard.letterCost + 1);

    const submit = () => {
        if (spamProtect) return;
        spamProtect = true
        const guess = inputValue.trim().toUpperCase()
        const correct = guess === sample.genreName.toUpperCase()
        
        if (!correct) {
            scorecard.wrongGuesses++
            if (!sample.wrongGuesses) sample.wrongGuesses = [];
            sample.wrongGuesses.push(guess)
            notify("WRONG GUESS!")
        } else {
            handleWin()
        }

        // reset
        setTimeout(() => {
            inputValue = ""
            spamProtect = false
        }, 500);
    }

</script>

{#if canAffordLetter}
    <p style="margin-bottom: .5rem;">click on a blank to reveal the letter (cost: {scorecard.lettercard.letterCost}%)</p>
{:else}
    <p style="margin-bottom: .5rem;" class="error">you can't afford any more letters</p>
{/if}

<div id="BLANKS_CONTAINER">
    <div class="blanks">
        {#each scorecard.lettercard.revealed as char, i}
            {#if char === " "}
                <div class="space char-slot">
                </div>
            {:else if char === "-"}
                <div class="hyphen char-slot">
                    -
                </div>
            {:else}
                <CostTooltip name="LETTER" cost={scorecard.lettercard.letterCost} {scorecard}>
                    <button
                        class="blank char-slot"
                        aria-label="reveal letter"
                        disabled={!canAffordLetter}
                        onclick={() => {
                            scorecard.lettercard.revealed[i] = sample.genreName[i]
                        }}
                    >
                        {(char||"").toUpperCase()}
                    </button>
                </CostTooltip>
            {/if}
        {/each}
    </div>

    <p class="wrong-guess-warning">wrong guesses cost {PENALTIES.wrongGuess}%</p>

    <CostTooltip name="WRONG GUESS" cost={PENALTIES.wrongGuess} {scorecard}>
        <input
            bind:value={inputValue}
            bind:this={input}
            placeholder="type your guess here"
            onkeypress={(e) => {
                if (e.key === "Enter") submit()
            }}
            type="text"
        >
    </CostTooltip>
</div>


<style>
    #BLANKS_CONTAINER {
        width: 100%;
        overflow-x: auto;
    }

    .char-slot {
        width: 3ch;
        height: 3ch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;

        padding: 0;
    }

    .blanks {
        display: flex;
        gap: .5rem;
        margin-bottom: .5rem;

        & > * {
            &.space, &.hyphen {
                background-color: transparent;
                border-color: transparent;
            }
        }
    }

    button {
        background-color: var(--bg1);
    }

    .wrong-guess-warning {
        color: var(--warning);
        font-style: italic;
        font-size: .8rem;
    }

    input {
        font-size: 1rem;
        letter-spacing: 2.9ch;
        padding: 0.5rem 0;
        width: 100%;
        text-transform: uppercase;
    }

</style>