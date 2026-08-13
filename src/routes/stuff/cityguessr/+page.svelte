<script lang="ts">
    import { cgState, startNewGame, nextTurn } from "./cgState.svelte";
    import { isCorrectGuess, isNearby } from "./guessing";
    import { audio, preLoadAudio } from "./sounds";
    import { onMount } from "svelte";
    import IncorrectGuessMeter from "./IncorrectGuessMeter.svelte";
    import GameSettings from "./GameSettings.svelte";
    import End from "./End.svelte";
    import InGameAnswers from "./InGameAnswers.svelte";

    onMount(() => {preLoadAudio()})

    let guessVal = $state("")
    let evaluatingAnswer = $state(false)
    const currentCity = $derived(cgState.cities[cgState.turn])


    const handleSubmit = async () => {
        evaluatingAnswer = true
        const isCorrect = isCorrectGuess(currentCity, guessVal)

        if (isCorrect) {
            audio.correct?.play()
            cgState.correctGuesses++
            currentCity.correct = true
            cgState.userAnswers.push(guessVal)
            guessVal = ""
            nextTurn()
        }
        else if (await isNearby(currentCity, guessVal)) {
            audio.nearby?.play()
            cgState.correctGuesses += 0.5
            currentCity.guessedNearby = true
            cgState.userAnswers.push(guessVal)
            guessVal = ""
            nextTurn()
        }
        else {
            audio.incorrect?.play()
            cgState.incorrectGuesses++
            cgState.userAnswers.push(guessVal)
            guessVal = ""
            if (cgState.incorrectGuesses >= cgState.init.allowedIncorrectGuesses) {
                cgState.status = 'over'
            }
            else {
                nextTurn()
            }
        }

        evaluatingAnswer = false
    }

    const handlePass = () => {
        cgState.incorrectGuesses++
        guessVal = ""
        if (cgState.incorrectGuesses >= cgState.init.allowedIncorrectGuesses) {
            cgState.status = 'over'
        }
        else {
            cgState.userAnswers.push("[PASS]")
            console.log(cgState.userAnswers)
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
    <button onclick={() => cgState.status = 'not-started'}>
        RESET
    </button>
    <br><br>
    <section id="CITY_GUESSR">
        <div class="city-container">
            {#if !cgState.loadingTurn}
                <img src={currentCity.url} alt="satellite photography of unknown city">
            {/if}
            <span>loading...</span>
        </div>
        <div class="controls">
            <p>City {cgState.turn+1} / {cgState.cities.length}</p>
            <p class="small">population: {(cgState.init.cityOpts.minPop||0).toLocaleString()} - {cgState.init.cityOpts.maxPop}</p>
            <br>
            <form onsubmit={e => {
                e.preventDefault()
                if (cgState.loadingTurn) return
                handleSubmit()
            }}>
                <label>
                    <span>your guess</span>
                    <input type="text" bind:value={guessVal} spellcheck="false">
                </label>
                <br>
                <button disabled={cgState.loadingTurn || evaluatingAnswer}>
                    {(cgState.loadingTurn || evaluatingAnswer) ? 'wait...' : 'guess'}
                </button>
                <button type="button" class="no-flicker" onclick={handlePass}  disabled={cgState.loadingTurn || evaluatingAnswer}>
                    {(cgState.loadingTurn || evaluatingAnswer) ? 'wait...' : 'pass'}
                </button>
            </form>
            <IncorrectGuessMeter />
            <InGameAnswers />
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