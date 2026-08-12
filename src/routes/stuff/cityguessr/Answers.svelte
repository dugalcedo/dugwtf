<script lang="ts">
    import { cgState } from "./cgState.svelte";
    import { allowedNames } from "./guessing";
    import type { CityInGame } from "./cgTypes";

    let viewedCity = $state<null|CityInGame>(null)
</script>

<ul id="ANSWERS" class:end={cgState.status==='over'}>
    {#each cgState.cities as city, i}
    {#if (cgState.turn > i) || (cgState.status === 'over')}
        <li class={city.correct?'correct':'incorrect'}>
            {city.name}, {city.admin1}, {city.country}
            {#if cgState.status === 'over'}
            {@const allowed = allowedNames(city)}
                <div class="over">
                    <button class="no-flicker" onclick={() => {
                        viewedCity = city
                    }}>
                        <img
                            src={city.url}
                            alt="satellite photo of {city.name}, {city.admin1}, {city.country}"
                            width="100"
                        >
                    </button>
                    <p class="allowed">
                        <b>guesses allowed:</b> <span class="small">{allowed.join(', ')}</span>
                    </p>
                </div>
            {:else}
            {@const allowed = allowedNames(city)}
                <p class="allowed small">
                    <b>guesses allowed:</b> <span>{allowed.join(', ')}</span>
                </p>
            {/if}
        </li>
    {:else}
        <li>???</li>
    {/if}
    {/each}
</ul>

{#if viewedCity}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
        class="image-viewer-backdrop" 
        tabindex="0"
        role="button"
        onclick={e => {
            if (e.currentTarget === e.target) viewedCity = null;
        }}>
        <img src={viewedCity.url} alt="sattelite photo of {viewedCity.name}, {viewedCity.admin1}, {viewedCity.country}">
        <button class="no-flicker" onclick={() => viewedCity = null}>CLOSE</button>
    </div>
{/if}

<style>


    #ANSWERS {
        &.end {
            display: flex;
            flex-direction: column;
            align-items: start;
            list-style-type: none;
            padding: 0;
            gap: 1rem;

            & > li {
                padding: .25rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                background-color: var(--bg1);
            }
        }
    }
    .correct {
        color: lime;
    }
    .incorrect {
        color: rgb(255, 64, 64);
    }
    .over {
        display: grid;
        grid-template-columns: 125px 1fr;
        gap: 1rem;
        align-items: start;
    }
    .allowed {
        color: white;
        max-width: 350px;
    }

    .image-viewer-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;

        & button {
            position: absolute;
            top: 0;
            left: 50%;
            translate: -50% 0;
            font-size: 2rem;
            background-color: var(--hl);
            color: var(--bg) !important;
        }
    }
</style>