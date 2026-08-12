<script lang="ts">
    import { cgState, startNewGame, nextTurn } from "./cgState.svelte";
    import { isCorrectGuess } from "./guessing";
    import IncorrectGuessMeter from "./IncorrectGuessMeter.svelte";
    import Answers from "./Answers.svelte";
    import GameSettings from "./GameSettings.svelte";
    import End from "./End.svelte";

    let guessVal = $state("")
    const currentCity = $derived(cgState.cities[cgState.turn])


    const handleSubmit = async () => {
        const isCorrect = await isCorrectGuess(currentCity, guessVal)

        if (isCorrect) {
            cgState.correctGuesses++
            currentCity.correct = true
            guessVal = ""
            nextTurn()
        }
        else {
            cgState.incorrectGuesses++
            guessVal = ""
            if (cgState.incorrectGuesses >= cgState.init.allowedIncorrectGuesses) {
                cgState.status = 'over'
            }
        }
    }

    const handlePass = () => {
        cgState.incorrectGuesses++
        guessVal = ""
        if (cgState.incorrectGuesses >= cgState.init.allowedIncorrectGuesses) {
            cgState.status = 'over'
        }
        else {
            nextTurn()
        }
    }
</script>

{#if cgState.status === 'not-started'}
    <div id="START_AND_SETTINGS">
        <button class="start-btn" onclick={startNewGame}>
            START
        </button>
        <GameSettings />
    </div>
{:else if cgState.status === 'loading'}
    <p>Loading...</p>
{:else if cgState.status === 'over'}
    <End />
{:else if cgState.status === 'started'}
    <section id="CITY_GUESSR">
        <div class="city-container">
            {#if !cgState.loadingTurn}
                <img src={currentCity.url} alt="satellite photography of unknown city">
            {/if}
            <span>loading...</span>
        </div>
        <div class="controls">
            <p>City {cgState.turn+1} / {cgState.cities.length}</p>
            <form onsubmit={e => {
                e.preventDefault()
                if (cgState.loadingTurn) return
                handleSubmit()
            }}>
                <label>
                    <span>your guess</span>
                    <input type="text" bind:value={guessVal}>
                </label>
                <br>
                <button disabled={cgState.loadingTurn}>
                    {cgState.loadingTurn ? 'wait...' : 'guess'}
                </button>
                <button type="button" class="no-flicker" onclick={handlePass}  disabled={cgState.loadingTurn}>
                    pass
                </button>
            </form>
            <IncorrectGuessMeter />
            <Answers />
        </div>
    </section>
{/if}

<style>
    #CITY_GUESSR {
        display: flex;
        gap: 1rem;
    }

    .start-btn {
        width: 100%;
        font-size: 3rem;
    }

    .city-container {
        width: 650px;
        height: 650px;
        border: 1px solid var(--fg);
        position: relative;

        & img {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2;
        }

        & span {
            position: absolute;
            z-index: 1;
            left: 50%;
            top: 50%;
            translate: -50% -50%;
        }
    }
</style>