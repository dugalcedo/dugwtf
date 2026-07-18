<script lang="ts">
    import { openBcPlayer } from "$lib/stores/bcPlayerStore.svelte";
    import { makeMoreReadable } from "$lib/clientUtils/makeMoreReadable";
    import type { PageData } from "./$types";
    import wau from "$lib/clientUtils/wauWriter";
    import { beforeNavigate, afterNavigate } from "$app/navigation";

    const {
        data
    }: {
        data: PageData
    } = $props()

    let navigating = $state(false)

    beforeNavigate(() => navigating = true)
    afterNavigate(() => navigating = false)

</script>

<svelte:head>
    <title>"{data.dug.title}" by {data.dug.artist} - listen and download</title>
</svelte:head>

{#if !data.dug}
    <p>not found</p>
{:else}
{@const { dug, prevDug, nextDug } = data}
    <h2 class="hl">{dug.title} ({dug.artist} {dug.type})</h2>

    <article>
        <div class="cover-and-info">
            <div class="controls">
                {#if prevDug}
                    <a class="small" href="/dugscography/{prevDug.id}">
                        PREV
                    </a>
                {:else}
                    <button disabled>
                        PREV
                    </button>
                {/if}
                <a href={dug.bc_link} target="_blank">
                    DOWNLOAD
                </a>
                <button onclick={() => openBcPlayer(dug)}>
                    &#9654;
                </button>
                {#if nextDug}
                    <a class="small" href="/dugscography/{nextDug.id}">
                        NEXT
                    </a>
                {:else}
                    <button disabled>
                        NEXT
                    </button>
                {/if}
            </div>
            {#if navigating}
                <div class="navigating">LOADING...</div>
            {:else}
                <img src={dug.cover_l} alt="album cover of '{dug.title}' by '{dug.artist}'">
            {/if}
            <table style="width: 100%;">
                <tbody>
                    <tr>
                        <th>#</th>
                        <td>{dug.id}</td>
                    </tr>
                    <tr>
                        <th>YEAR</th>
                        <td>{dug.year}</td>
                    </tr>
                    <tr>
                        <th>FORMAT</th>
                        <td>{dug.type}</td>
                    </tr>
                    <!-- CREDITS -->
                    {#if dug.credits}
                        <tr class="wide">
                            <th colspan="2" class="wide">CREDITS</th>
                        </tr>
                        {#each Object.entries(dug.credits) as [role, names]}
                            <tr>
                                <th>{role.toUpperCase()}</th>
                                <td>{names.join(', ')}</td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>

        <div class="right">
            <nav>
                <button  onclick={() => openBcPlayer(dug)}>
                    PLAY
                </button>
                <a class="button" href={dug.bc_link}>
                    download on bandcamp
                </a>
            </nav>
            <div class="desc" use:makeMoreReadable>
                {dug.desc_long}
            </div>
            <div class="wau">
                {@html wau.write(dug.wau ?? "")}
            </div>
        </div>
        
    </article>
{/if}

<style>
    h2 {
        border-bottom: 1px solid var(--hl);
        margin-bottom: 1rem;
    }

    th {
        text-align: left;
        font-size: .9rem;
        max-width: 120px;
    }

    .wide {
        background-color: var(--fg);
        color: var(--bg);
    }

    .cover-and-info {
        position: relative;
        margin-right: 2rem;
        margin-bottom: 2rem;
        z-index: 6;

        & img {
            width: 100%;
            display: block;
        }

        @media (width >= 600px) {
            width: 300px;
            float: left;
        }
    }


    .controls {
        display: flex;

        & > * {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0;
            padding: .5rem;
            background-color: var(--fgo10);

            &:not(:last-child) {
                border-right: 1px solid var(--fg);
            }
        }
    }

    .small {
        font-size: 0.6rem;
    }

    .wau {
        max-width: 900px;
        position: absolute;
        right: 1rem;
        top: 1rem;
        pointer-events: none;
        user-select: none;
        opacity: 0.1;
    }

    .right {
        position: relative;
        z-index: 5;
    }

    .right nav {
        margin-bottom: 1rem;
    }
</style>