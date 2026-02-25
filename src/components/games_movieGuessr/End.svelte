<script lang="ts">
    import { mg, deriveRemainingCashFromMovie, deriveColorVarFromMoneyAmount, STARTING_CASH } from "$lib/stores/gameStores/movieGuessr.svelte";
    import BlorbyText from "../fun/BlorbyText.svelte";
    import CashChip from "./CashChip.svelte";

    const finalCash = $derived(mg.movies.reduce((cash, movie) => {
        return cash + deriveRemainingCashFromMovie(movie)
    }, 0))

    const finalCashColorVar = $derived(deriveColorVarFromMoneyAmount(finalCash))

    const possible = $derived(STARTING_CASH * mg.movies.length)
</script>

<div class="banner">
    <h3>THE END</h3>
    <p>
        you won
        <span style="
            background-color: var(--{finalCashColorVar});
            color: var(--bg);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: .5rem;
            font-weight: bold;
            width: 3em;
            animation: funny-{finalCashColorVar}-outline 1s linear infinite;
        ">
            €{finalCash}
        </span>
        out of a possible
        <span>€{possible}</span>
    </p>
    <BlorbyText text="refresh to try again" />
</div>

<div class="movies">
    {#each mg.movies as movie}
    {@const cash = deriveRemainingCashFromMovie(movie)}
        <div class="movie">
            <div class="stats">
                <h4 style="
                    background-color: var(--{deriveColorVarFromMoneyAmount(cash)});
                ">
                    <span style="
                        color: var(--bg);
                    ">
                        €{cash}
                    </span>
                    {movie.title}
                </h4>
            </div>
            <div class="poster">
                {#if movie.omdb?.poster}
                    <img src={movie.omdb.poster} alt="poster for the film '{movie.title}'">
                {:else}
                    <p class="error">no poster available</p>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .banner {
        text-align: center;
        margin: 2rem;
        font-size: 1.5em;
    }

    .movies {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
    }

    .movie {
        & .poster {
            width: 100%;
            min-height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;

            & img {
                width: 100%;
            }
        }

        & .stats {
            & span {
                display: inline-flex;
                background-color: var(--fg);
                width: 2em;
                justify-content: center;
                border-radius: .25rem;
                transform: scale(1.3);
                margin-right: 1rem;
            }

            & h4 {
                color: var(--bg);
                text-transform: uppercase;
                padding: .5rem;
            }
        }
    }
</style>