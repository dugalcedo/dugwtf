<script lang="ts">
    import CashChip from "./CashChip.svelte";

    import { 
        mg,
        deriveColorVarFromMoneyAmount,
        deriveRemainingCashFromMovie
    } from "$lib/stores/gameStores/movieGuessr.svelte";

    const movie = $derived(mg.movies[mg.i])
    const cash = $derived(deriveRemainingCashFromMovie(movie))

</script>


{#if mg.status === 'started' && movie}
    <div class="stats">
        <h3 class="round">
            ROUND {mg.i+1} OF {mg.movies.length}
        </h3>
        <div class="cash">
            <p style="font-size: .8rem;">remaining cash this round:</p>
            <CashChip {cash} />
        </div>
    </div>
{/if}

<style>
    .stats {
        text-align: center;

        & h3 {
            color: var(--hl);
            padding-bottom: .5rem;
        }
    }

    .cash {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
</style>