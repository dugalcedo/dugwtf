<script lang="ts">
    import { mg, startGame } from "$lib/stores/gameStores/movieGuessr.svelte";
    import Dot from "../../../components/fun/Dot.svelte";
    import Bankrupt from "../../../components/games_movieGuessr/Bankrupt.svelte";
    import Correct from "../../../components/games_movieGuessr/Correct.svelte";
    import MovieGuessrInterface from "../../../components/games_movieGuessr/MovieGuessrInterface.svelte";
</script>

<div id="MG_HEAD">
    <h2>
        movie<Dot />guessr
    </h2>
</div>

{#if mg.status === 'not-started'}
    <button onclick={startGame}>
        Start random game
    </button>
{:else if mg.status === 'fetching'}
    <p>Loading...</p>
{:else if mg.status === 'correct'}
    <Correct />
{:else if mg.status === 'bankrupt'}
    <Bankrupt />
{:else if mg.status === 'error' || !mg.movies?.length}
    <p>Error</p>
{:else}
    <MovieGuessrInterface movies={mg.movies} />
{/if}


<style>
    #MG_HEAD {
        & > h2 {
            color: var(--hl);
        }
    }
</style>