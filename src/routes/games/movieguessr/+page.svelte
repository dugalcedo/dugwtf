<script lang="ts">
    import { mg, startGame, startGameFromCode } from "$lib/stores/gameStores/movieGuessr.svelte";
    import Dot from "../../../components/fun/Dot.svelte";
    import MovieGuessrInterface from "../../../components/games_movieGuessr/MovieGuessrInterface.svelte";
    import EndOfRound from "../../../components/games_movieGuessr/EndOfRound.svelte";
    import End from "../../../components/games_movieGuessr/End.svelte";

    import Stats from "../../../components/games_movieGuessr/Stats.svelte";

    let codeInputValue: string = $state("")
</script>

<div id="MG_HEAD">
    <h2>
        MOVIE<Dot />guessr
    </h2>
    <div>
        <Stats />
    </div>
    <div class="code">
        {#if mg.code}
            <p>CODE: {mg.code}</p>
        {/if}
    </div>
</div>

{#if mg.status === 'not-started'}
    <button onclick={startGame}>
        start random game
    </button>
    <br>
    <br>
    <input type="text" bind:value={codeInputValue} placeholder="enter 5-char code">
    <button onclick={() => startGameFromCode(codeInputValue)}>
        start game from code
    </button>
{:else if mg.status === 'fetching'}
    <p>Loading...</p>
{:else if mg.status === 'correct'}
    <EndOfRound />
{:else if mg.status === 'bankrupt'}
    <EndOfRound />
{:else if mg.status === 'end'}
    <End />
{:else if mg.status === 'error' || !mg.movies?.length}
    <p>Error</p>
{:else}
    <MovieGuessrInterface movies={mg.movies} />
{/if}


<style>
    #MG_HEAD {
        border-bottom: 1px solid var(--hl);
        padding-bottom: 1rem;
        margin-bottom: 2rem;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: flex-end;

        @media (width < 750px) {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }

        & > h2 {
            color: var(--hl);
        }
    }

    .code {
        text-align: right;
        font-size: .8rem;
        color: var(--hl);
    }
</style>