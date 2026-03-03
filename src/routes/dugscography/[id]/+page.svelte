<script lang="ts">
    import { openBcPlayer } from "$lib/stores/bcPlayerStore.svelte";
    import { makeMoreReadable } from "$lib/util/makeMoreReadable";
    import type { PageData } from "./$types";

    const {
        data
    }: {
        data: PageData
    } = $props()

</script>

{#if !data.dug}
    <p>not found</p>
{:else}
{@const { dug, prevDug, nextDug } = data}
    <h2 class="hl">{dug.title} ({dug.artist} {dug.type})</h2>

    <article>
        <div class="cover-and-info">
            <img src={dug.cover_l} alt="album cover of '{dug.title}' by '{dug.artist}'">
            <div class="controls">
                {#if prevDug}
                    <a href="/dugscography/{prevDug.id}">
                        PREV
                    </a>
                {:else}
                    <button disabled>
                        PREV
                    </button>
                {/if}
                <a href={dug.bc_link} target="_blank">
                    GET
                </a>
                <button onclick={() => openBcPlayer(dug)}>
                    &#9654;
                </button>
                {#if nextDug}
                    <a href="/dugscography/{nextDug.id}">
                        NEXT
                    </a>
                {:else}
                    <button disabled>
                        NEXT
                    </button>
                {/if}
            </div>
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

        <div class="desc" use:makeMoreReadable>
            {dug.desc_long}
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
</style>