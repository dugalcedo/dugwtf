<script lang="ts">
    import type { MG_Movie } from "$lib/stores/gameStores/movieGuessr.svelte";
    import { mg, deriveRemainingCashFromMovie, handleBankrupt } from "$lib/stores/gameStores/movieGuessr.svelte";
    import Reviews from "./Reviews.svelte";
    import Info from "./Info.svelte";
    import GuessInput from "./GuessInput.svelte";

    const {
        movies
    } : {
        movies: MG_Movie[]
    } = $props()

    $effect(() => {
        console.log($state.snapshot(mg))
    })

    const movie = $derived(movies[mg.i])
    const cash = $derived(deriveRemainingCashFromMovie(movie))

    $effect(() => {
        if (cash <= 0) {
            handleBankrupt()
        }
    })
</script>

{#if !movie}
    <p class="error">No movie</p>
{:else}
    <p>CASH: €{cash.toFixed(2)}</p>
    <GuessInput />
    <div class="modules">
        <Info {movie} />
        <Reviews {movie} />
    </div>
{/if}

<style>
    .modules {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>