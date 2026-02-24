<script lang="ts">
    import Movie from "./Movie.svelte";
    import { mg, nextRound } from "$lib/stores/gameStores/movieGuessr.svelte";

    const movie = $derived(mg.movies[mg.i])
</script>

{#if !movie}
    <p class="error">something went wrong. refresh.</p>
{:else}
    <p>you lost that round!</p>
    <p>
        the movie was
        <em>{movie.title}</em>
    </p>
    <button onclick={nextRound}>
        next round
    </button>
    <Movie {movie} />
{/if}

<style>
    em {
        color: var(--hl);
        font-weight: bold;
    }
    button {
        margin-bottom: 2rem;
    }
</style>