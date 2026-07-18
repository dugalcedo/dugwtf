<script lang="ts">
    import { gg, startRandomGame } from "../../../lib/stores/gameStores/genreGuessr.svelte";
    import GuessInterface from "../../../components/games_genreGuessr/GuessInterface.svelte";
    import Stats from "../../../components/games_genreGuessr/Stats.svelte";
    import EndOfRound from "../../../components/games_genreGuessr/EndOfRound.svelte";
    import Dot from "../../../components/fun/Dot.svelte";
    import Copy from "../../../components/ui-thingies/Copy.svelte";
    import GameCodeInput from "../../../components/games_genreGuessr/GameCodeInput.svelte";
</script>

<div id="GG_HEAD">
    <h2>
        genre<Dot />guessr
        {#if gg.gameId}
            <small style="font-size: .7rem;">
                GAME ID: {gg.gameId}
                <Copy text={gg.gameId} />
                <!-- <Copy text={backendUrl()+`/#games/genreguessr?id=${gg.gameId}`} buttonText="COPY URL" /> -->
            </small>
        {/if}
    </h2>
    {#if gg.notification}
        <div class="notification">
            {gg.notification}
        </div>
    {/if}
</div>

{#if gg.status === 'started'}
    <Stats />
{/if}

{#if gg.status == 'error'}

    <h4 class="error">seems like something went wrong</h4>
    <p>maybe you entered an invalid code</p>
    <br>
    <button onclick={() => {
        gg.status = 'beforeStart'
    }}>
        try again
    </button>

{:else if gg.status === 'beforeStart'}

    <button onclick={startRandomGame}>
        start random game
    </button>

    <br> <br>

    <GameCodeInput />

{:else if gg.status == 'fetching-random'}

    <p>Loading...</p>

{:else if gg.status == 'lost-round' || gg.status == 'won-round'}
    <EndOfRound />
{:else if gg.status == 'started'}
    {#if !gg.samples}
        <p>No samples?</p>
    {:else if gg.samples[gg.i] && gg.scorecards[gg.i]}
        <GuessInterface i={gg.i} bind:scorecard={gg.scorecards[gg.i]} bind:sample={gg.samples[gg.i]} />
    {:else}
        <p class="error">memory error: game status is 'started' but there are no samples</p>
    {/if}
{/if}

<style>
    #GG_HEAD {
        position: relative;

        & > h2 {
            color: var(--hl);
        }

        border-bottom: 1px solid var(--hl);
        padding-bottom: .5rem;
        margin-bottom: 1rem;

        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;

        & > .notification {
            position: absolute;
            top: 7px;
            left: 50%;
            translate: -50% 0;
            background-color: var(--error);
            color: var(--fg);
            font-size: 1rem;
            padding: .5rem;
            animation: funny-error-outline 1s linear infinite;
            border-color: var(--error);
        }
    }
</style>