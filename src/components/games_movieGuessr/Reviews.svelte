<script lang="ts">
    import type { MG_Movie } from "$lib/stores/gameStores/movieGuessr.svelte";
    import BuyButton from "./BuyButton.svelte";

    const {
        movie
    } : {
        movie: MG_Movie 
    } = $props()

</script>

<div id="REVIEWS_MODULE">
    <h3>LETTERBOXD REVIEWS</h3>

    <div class="reviews">
        {#each movie.reviews as review, i (review)}
            {#if i < (movie.reviewsRevealed||1)}
                <p class="review">
                    {@html review.replaceAll('\n', '<br />')}
                </p>
            {/if}
        {/each}
    </div>
    
    {#if (movie.reviewsRevealed||1) < movie.reviews.length}
        <BuyButton name="review" />
    {/if}
</div>

<style>
    @media (width < 750px) {
        #REVIEWS_MODULE {
            order: -1;
        }
    }

    h3 {
        background-color: var(--fg);
        color: var(--bg);
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .reviews {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .review {
        background-color: var(--bg1);
        padding: .5rem;
        border-left: 10px solid var(--hl);
    }
</style>