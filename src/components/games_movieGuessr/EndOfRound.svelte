<script lang="ts">
    import Movie from "./Movie.svelte";
    import { mg, nextRound, deriveRemainingCashFromMovie } from "$lib/stores/gameStores/movieGuessr.svelte";
    import CashChip from "./CashChip.svelte";

    const movie = $derived(mg.movies[mg.i])
    const cash = $derived(deriveRemainingCashFromMovie(movie))


</script>

{#if !movie}
    <p class="error">something went wrong. refresh.</p>
{:else}
    <div class="result">
        <h3>END OF ROUND {mg.i+1}</h3>
        <p class="won">
            you won
            <CashChip {cash} />
            this round
        </p>
        <p>
            the movie was
            <em>{movie.title}</em>
        </p>
        <button onclick={nextRound}>
            {mg.i===(mg.movies.length-1)?"SEE GAME RESULT":"NEXT ROUND"}
        </button>
    </div>
    <Movie {movie} />
{/if}

<style>
    .result {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }
    .won {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    em {
        color: var(--hl);
        font-weight: bold;
    }
    button {
        margin-bottom: 2rem;
    }
</style>