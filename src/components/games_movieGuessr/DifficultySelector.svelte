<script lang="ts">
    import { mg, MG_DifficultyRecord } from "$lib/stores/gameStores/movieGuessr.svelte";

</script>

{#if mg.status !== 'not-started'}
    <p class="error">you cannot select a difficulty because the game has already started</p>
{:else}
    <h3>select a difficulty</h3>
    <br>
    <div class="difficulties">
        {#each Object.entries(MG_DifficultyRecord) as [name, { getMax }]}
        {@const max = getMax()}
            <button
                class:inactive={mg.difficulty !== name}
                onclick={() => mg.difficulty = (name as any)}
            >
                {name.toUpperCase()} ({max||"???"} most popular films)
            </button>
        {/each}
    </div>
{/if}

<style>
    .difficulties {
        display: flex;
        flex-direction: column;

        width: 400px;
        max-width: 100%;
        font-size: .8rem;

        & button {
            padding: 1rem;
            background-color: var(--hl);
            color: var(--bg) !important;
        }
    }

    .inactive {
        animation: none;
        filter: grayscale(1);
    }
</style>