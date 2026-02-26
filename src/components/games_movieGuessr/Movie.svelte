<script lang="ts">
    import type { MG_Movie } from "$lib/stores/gameStores/movieGuessr.svelte";

    const {
        movie
    }: {
        movie: MG_Movie
    } = $props()

</script>

<div class="movie">
    <div class="left">
        <div class="poster">
            {#if movie.omdb?.poster}
                <img src={movie.omdb.poster} alt="poster for a movie called '{movie.title}' from the year '{movie.year}'">
            {/if}
        </div>
    </div>
    <div class="right">
        <h3>{movie.title}</h3>
        <p>
            <b>YEAR:</b>
            <span>{movie.year||"unknown"}</span>
        </p>
        <p>
            <b>DIRECTOR{movie.directors.length>1?'S':''}:</b>
            <span>{movie.directors.join(', ')}</span>
        </p>
        <p>
            <b>TOP 3 CAST:</b>
            <span>{movie.top3Cast.join(', ')}</span>
        </p>
        <p>
            <b>LETTERBOXD RATING:</b>
            <span>{movie.rating||'unknown'}</span>
        </p>
        <p>
            <b>REVIEWS:</b>
            <span class="reviews">
                {#each movie.unsanitizedReviews as review}
                    <span class="review">
                        {@html review.replaceAll('\n','<br>')}
                    </span>
                {/each}
            </span>
        </p>
    </div>
</div>

<style>
    .movie {
        display: flex;
        gap: 1rem;
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;

        @media (width < 550px) {
            display: grid;

            & .right { order: -1; }
        }
    }
    
    .right {
        & > p {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 1rem;
            padding-bottom: .25rem;
            padding-top: .25rem;

            @media (width < 800px) {
                grid-template-columns: 1fr;
            }

            &:not(:last-child) {
                border-bottom: 1px solid var(--fgo20);
            }
        }
    }

    .reviews {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .review {
        font-size: .8rem;
        padding: 3px;
        background-color: var(--bg1);
        border-left: 10px solid var(--fgo20);
        padding-left: 8px;
    }
</style>