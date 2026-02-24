<script>
    import { mg, nextRound } from "../../lib/stores/gameStores/movieGuessr.svelte";
    import Movie from "./Movie.svelte";

    const movie = $derived(mg.movies[mg.i]) 
</script>

{#if !movie}
    <p class="error">something went wrong</p>
{:else}
    correct!
    <button onclick={nextRound}>
        next round
    </button>
    <Movie {movie} />
{/if}