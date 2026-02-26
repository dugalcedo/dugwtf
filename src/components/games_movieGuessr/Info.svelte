<script lang="ts">
    import { COSTS, type MG_Movie } from "$lib/stores/gameStores/movieGuessr.svelte";
    import BlurryPoster from "./BlurryPoster.svelte";
    import InfoIcon from "./InfoIcon.svelte";
    import BuyButton from "./BuyButton.svelte";

    const {
        movie
    } : {
        movie: MG_Movie 
    } = $props()
</script>

<div id="INFO_MODULE">

    <div class="infos">
        <!-- POSTER -->
        <div class="info">
            <h4><InfoIcon name="image" />BLURRY POSTER</h4>
            <div>
                {#if !movie.omdb?.poster}
                    <p class="na">not available for this movie</p>
                {:else if movie.blurryPosterRevealed}
                    <BlurryPoster poster={movie.omdb?.poster||""} />
                {:else}
                    <BuyButton name="poster" />
                {/if}
            </div>
        </div>
        <!-- DIRECTORS -->
        <div class="info">
            <h4><InfoIcon name="director" />DIRECTOR(S)</h4>
            <div>
                {#if movie.directorsRevealed}
                    {movie.directors.join(', ')}
                {:else}
                    <BuyButton name="director" />
                {/if}
            </div>
        </div>
        <!-- TOP 3 CAST -->
        <div class="info">
            <h4><InfoIcon name="3people" />TOP 3 CAST</h4>
            <div>
                {#if !movie.top3Cast?.length}
                    <p class="na">not available for this movie</p>
                {/if}
                {#each movie.top3Cast as name, i (name)}
                    {#if (movie.castRevealed||0) > i}
                        <p>{name}</p>
                    {/if}
                {/each}
                {#if (movie.castRevealed||0) < movie.top3Cast.length}
                    <BuyButton name="cast" />
                {/if}
            </div>
        </div>
        <!-- YEAR -->
        <div class="info">
            <h4><InfoIcon name="calendar" />YEAR</h4>
            <div>
                {#if !movie.year}
                    <p class="na">not available for this movie</p>
                {:else if movie.yearRevealed}
                    {movie.year}
                {:else}
                    <BuyButton name="year" />
                {/if}
            </div>
        </div>
        <!-- Rating -->
        <div class="info">
            <h4><InfoIcon name="halfstar" />LETTERBOXD RATING</h4>
            <div>
                {#if !movie.rating}
                    <p class="na">not available for this movie</p>
                {:else if movie.ratingRevealed}
                    {movie.rating}
                {:else}
                    <BuyButton name="rating" />
                {/if}
            </div>
        </div>
        <!-- COUNTRY -->
        <div class="info">
            <h4><InfoIcon name="earth" />COUNTRY</h4>
            <div>
                {#if !movie.omdb?.country}
                    <p class="na">not available for this movie</p>
                {:else if movie.countryRevealed}
                    {movie.omdb?.country}
                {:else}
                    <BuyButton name="country" />
                {/if}
            </div>
        </div>
        <!-- MPA Rating -->
        <div class="info">
            <h4><InfoIcon name="no" />MPA/AGE RATING</h4>
            <div>
                {#if !movie.omdb?.mpaRating}
                    <p class="na">not available for this movie</p>
                {:else if movie.mpaRatingRevealed}
                    {movie.omdb?.mpaRating||'unknown'}
                {:else}
                    <BuyButton name="mpaRating" />
                {/if}
            </div>
        </div>
        <!-- Box office -->
        <div class="info">
            <h4><InfoIcon name="dollar" />BOX OFFICE</h4>
            <div>
                {#if !movie.omdb?.boxOffice}
                    <p class="na">not available for this movie</p>
                {:else if movie.boxOfficeRevealed}
                    {movie.omdb?.boxOffice||'unknown'}
                {:else}
                    <BuyButton name="boxOffice" />
                {/if}
            </div>
        </div>
        <!-- Runtime -->
        <div class="info">
            <h4><InfoIcon name="clock" />RUNTIME</h4>
            <div>
                {#if !movie.omdb?.runtime}
                    <p class="na">not available for this movie</p>
                {:else if movie.runtimeRevealed}
                    {movie.omdb?.runtime||'unknown'}
                {:else}
                    <BuyButton name="runtime" />
                {/if}
            </div>
        </div>
    </div>

</div>

<style>
    .infos {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (width < 550px) {
            grid-template-columns: 1fr;
        }
    }
    
    .info {
        background-color: var(--bg1);
        border-radius: .5rem;
        overflow: hidden;

        & > h4 {
            display: flex;
            align-items: center;
            gap: .25rem;
            padding: .25rem;
            background-color: var(--fgo10);
            border-bottom: 1px solid var(--fg);
        }

        & > div {
            padding: .5rem;
        }
    }
</style>