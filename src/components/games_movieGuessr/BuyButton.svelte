<script lang="ts">
    import type { CostName } from "$lib/stores/gameStores/movieGuessr.svelte";
    import { mg, COSTS, guess, deriveColorVarFromMoneyAmount, deriveRemainingCashFromMovie } from "$lib/stores/gameStores/movieGuessr.svelte";

    const {
        name
    }: {
        name: CostName
    } = $props()

    const cost = $derived(COSTS[name])

    const text = $derived.by(() => {
        switch (name) {
            case "review":
                return 'buy a review'
            case "cast":
                return 'buy a cast member'
            case "director":
                return 'buy director(s)'
            case "poster":
                return 'buy blurry poster'
            case "rating":
                return 'buy letterboxd rating'
            case "mpaRating":
                return 'buy MPA rating'
            case "boxOffice":
                return 'buy box office earnings'
            case "wrongAnswer":
                return 'guess (free if correct)'
            default:
                return `buy ${name}`
        }
    })

    const movie = $derived(mg.movies[mg.i])

    const handleClick = () => {
        if (!movie) return;
        switch (name) {
            case "review":
                movie.reviewsRevealed = (movie.reviewsRevealed||1) + 1;
                break;
            case "cast":
                movie.castRevealed = (movie.castRevealed||0) + 1;
                break;
            case "year":
                movie.yearRevealed = true;
                break
            case "director":
                movie.directorsRevealed = true;
                break
            case "poster":
                movie.blurryPosterRevealed = true;
                break
            case "rating":
                movie.ratingRevealed = true;
                break
            case "country":
                movie.countryRevealed = true
                break
            case "mpaRating":
                movie.mpaRatingRevealed = true;
                break
            case "boxOffice":
                movie.boxOfficeRevealed = true;
                break
            case "runtime":
                movie.runtimeRevealed = true;
                break
            case "wrongAnswer":
                guess()
                break
        }
    }

    const cash = $derived(deriveRemainingCashFromMovie(movie))
    const bg = $derived(`var(--${deriveColorVarFromMoneyAmount(cash-cost)})`)

    const disabled = $derived.by(() => {
        if (name === "wrongAnswer" && mg.signalingWrongAnswer) return true;
        if (name !== "wrongAnswer" && cost > cash) return true;
        return false;
    })

</script>

{#if movie}
<button onclick={handleClick} disabled={disabled}>
    <span
        class="cost-badge" 
        style="
            background-color: {bg} !important;
        "
    >
        €{cost}
    </span>
    <span class="text">{text}</span>
</button>
{/if}

<style>
    button {
        font-size: .8rem;
        padding: 0;
        border: 1px solid var(--hl);
        border-radius: 1rem;
        padding-right: .5rem;
    }

    .cost-badge {
        background-color: var(--hl);
        color: var(--bg);
        font-weight: bold;
        display: inline-block;
        border-radius: 1rem;
        padding: 0 .4rem .2rem .4rem;
        translate: -5% 0;
        transform: scale(1.2);
    }

    button:hover {
        background-color: var(--hl);
        color: var(--bg);

        & .cost-badge {
            scale: 1.3;
        }
    }
</style>