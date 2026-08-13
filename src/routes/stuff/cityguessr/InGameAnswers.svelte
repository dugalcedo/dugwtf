<script lang="ts">
    import { cgState } from "./cgState.svelte";
    import { allowedNames } from "./guessing";

    const seeingMore = $state<number[]>([])
    const lis = $state<HTMLLIElement[]>([])

    $effect(() => {if (cgState.turn>=0){
        lis[cgState.turn]!.scrollIntoView()
        // lis[cgState.turn]!.parentElement!.scrollBy({ top: -150 })
    }})
</script>

<div id="IN_GAME_ANSWERS">
    <h3>answers</h3>
    <ol>
        {#each cgState.cities as city, i (city)}
        {@const guessed = cgState.turn > i}
        {@const allowed = allowedNames(city)}
        <li bind:this={lis[i]} class="answer" class:current={cgState.turn === i}>
            {#if guessed}
            <strong
                class:correct={city.correct}
                class:nearby={city.guessedNearby}
                class:incorrect={guessed && !city.correct && !city.guessedNearby}
            >
                {city.name},
                <span class="small" style="opacity: 0.5;">{city.admin1}, {city.country}</span>
            </strong>

            <br>
            <span class="guessed small">
                you guessed: {cgState.userAnswers[i]?.trim()||"[blank]"}
                {#if city.guessedNearby}(a place nearby){/if}
            </span>
            <br>
            <span class="allowed small i">
                {#if seeingMore.includes(i) || allowed.length <= 3}
                    allowed answers: <span class="small">{allowed.join(', ')}</span>
                {:else}
                    allowed answers: <span class="small">
                        {allowed.slice(0, 3).join(', ')}
                        <button class="see-more no-flicker" onclick={() => seeingMore.push(i)}>see more...</button>
                    </span>
                {/if}
            </span>
            {:else}
            ?????
            {/if}
        </li>
        {/each}
    </ol>
</div>

<style>
    #IN_GAME_ANSWERS {
        max-width: 400px;
    }

    #IN_GAME_ANSWERS ol {
        max-height: 400px;
        overflow-y: auto;
    }

    .current {
        background-color: var(--fgo20);
    }

    .see-more {
        padding: 0;
        font-size: 0.6rem;
        border: 0;
        text-decoration: underline;
    }

    .answer {
        margin-bottom: 1rem;
    }

    .correct {
        color: lime;
    }

    .nearby {
        color: yellow;
    }

    .incorrect {
        color: var(--error);
    }

    .allowed {
        font-style: italic;
        opacity: 0.7;
        font-size: 0.6rem;
    }
</style>