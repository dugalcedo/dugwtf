<script lang="ts">
    import { cgState } from "./cgState.svelte";
    import { allowedNames } from "./guessing";

    const allowedShown = $state<boolean[]>([])
</script>

<br>
<div id="END_GAME_ANSWERS">
    <h3>results</h3>
    <br>
    <table>
        <tbody>
            {#each cgState.cities as city, i (city)}
            {@const allowed = allowedNames(city)}
                <tr>
                    <td class="number-td" class:correct={city.correct}>{i+1}</td>

                    <!-- IMAGE TD -->
                    <td class="image-td">
                        <button 
                            class="no-flicker no-button"
                            commandfor="dialog-{i}"
                            command="show-modal"
                        >
                            <img class="img" src={city.url} alt="satellite photo of {city.name}, {city.admin1}, {city.country}">
                        </button>
                        <dialog id="dialog-{i}" closedby="any">
                            <img src={city.url} alt="satellite photo of {city.name}, {city.admin1}, {city.country}">
                        </dialog>
                    </td>

                    <!-- NAME TD -->
                    <td class="name-td">
                        <p class="name" class:correct={city.correct} class:nearby={city.guessedNearby} class:incorrect={!city.correct && !city.guessedNearby}>
                            {city.name},
                            <span class="small">{city.admin1}, {city.country}</span>
                        </p>
                        <p class="small">
                            you guessed: {cgState.userAnswers[i]?.trim()||'[blank]'}
                            {#if city.guessedNearby}(a place nearby){/if}
                        </p>
                        <p class="allowed small">
                            allowed answers: 
                            <span>
                                {#if allowedShown[i] || allowed.length <= 3}
                                    {allowed.join(', ')}
                                {:else}
                                    {allowed.slice(0, 3).join(', ')}
                                    <button class="no-flicker no-button" onclick={() => allowedShown[i] = true}>show all</button>
                                {/if}
                            </span>
                        </p>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        max-width: 600px;
    }

    .image-td {
        & .img {
            width: 100px;
            display: block;
        }
    }

    .name-td {
        & .name .small {
            opacity: 0.5;
        }
    }

    .allowed {
        & span {
            font-size: .6rem;
            opacity: 0.7;
            font-style: italic;
        }
    }

    .correct {
        color: lime;
    }

    .incorrect {
        color: var(--error);
    }

    .nearby {
        color: yellow;
    }
</style>