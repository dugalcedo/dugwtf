<script lang="ts">
    import { type Dug } from "../../../lib/releases.js";
    import { bcplayer } from "../../../context/bcplayer.svelte.js";
    import { beforeNavigate, afterNavigate } from "$app/navigation";
    import { onMount } from "svelte";
    import LoadingDots from "../../../components/LoadingDots.svelte";

    let coverEl: HTMLImageElement | null = $state(null)
    let coverLoading = $state(true)

    const {
        next,
        prev,
        dug
    } : {
        next?: string,
        prev?: string,
        dug: Dug
    } = $props()

    function waitForCoverToLoad() {
        let checkForCoverLoadingComplete = setInterval(()=>{
            if (coverEl?.complete) {
                coverLoading = false
                clearInterval(checkForCoverLoadingComplete)
            }
        }, 100)
    }

    onMount(() => {
        waitForCoverToLoad()
    })

    beforeNavigate(() => {
        coverLoading = true
    })

    afterNavigate(() => {
        waitForCoverToLoad()
    })

</script>

<div class="res dugpage">
    <div class="nav">
        <div>
            {#if prev}
                <a href="/dug/{prev}">
                    <button>&larr; prev</button>
                </a>
            {/if}
        </div>
        <div>
            {#if next}
                <a href="/dug/{next}">
                    <button>next &rarr;</button>
                </a>
            {/if}
        </div>
    </div>

    {#if coverLoading}
        <div class="cover-loading">
            <LoadingDots size="3rem" />
        </div>
    {/if}
    <img 
        class="cover" 
        class:hidden={coverLoading}
        bind:this={coverEl} 
        src="{dug.cover_l}" 
        alt="album cover of {dug.title} by {dug.artist}"
    >


    <section class="info">
        <h2 class="id">
            <span>{dug.id}</span>
            <span class="year">{dug.year}</span>
        </h2>
        <h2 class="title">
            {dug.title}
            {#if !['Dug Alcedo', 'First Dog'].includes(dug.artist)}
                <p class="artist">by {dug.artist}</p>
            {/if}
        </h2>
        <div class="links">
            <a href="{dug.bc_link}" target="_blank">
                <button>
                    BUY
                </button>
            </a>
            <button onclick={() => {
                bcplayer.dug = dug
                bcplayer.isOpen = true
            }}>
                PLAY
            </button>
        </div>
    </section>
</div>

<style>
    .nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        margin-bottom: 8px;

        & button {
            width: 100%;
            padding: 4px;
        }
    }

    .cover-loading {
        width: 100%;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.4);
    }

    .dugpage {
        display: grid;

        & .cover {
            width: 100%;

            &.hidden {
                display: none;
            }
        }

        & .id {
            color: var(--black);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            text-shadow: 
                1px 1px 0px var(--white),
                1px -1px 0px var(--white),
                -1px -1px 0px var(--white),
                -1px 1px 0px var(--white)
            ;

            & .year {
                text-shadow: none;
                color: var(--white);
                font-size: .7rem;
            }
        }

        & .title {
            background-color: var(--white);
            color: var(--black);
            text-align: right;
            font-style: italic;
            padding-right: .5rem;
        }

        & .artist {
            font-size: .8rem;
        }

        @media (min-width: 600px) {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;

            & .nav {
                grid-column: span 2;
            }
        }
    }

    .links {
        & button {
            width: 100%;
            /* margin: 4px 0; */
            padding: .5rem;
            font-size: 1rem;
        }
    }

</style>