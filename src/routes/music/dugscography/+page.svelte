<script lang="ts">
    import dugs from "../../../lib/releases.js";
    let showingMore = $state(false)
    const shownDugs = $derived.by(()=>{
        return showingMore ? (
            dugs
        ) : (
            dugs.filter(d => d.year > 2012 || ['DUG020', 'DUG021'].includes(d.id))
        )
    })
</script>

<div class="inner-page">
    <h2>dugscography</h2>
    <p>the following is a catalog of almost all of the music i have ever worked on</p>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>year</th>
                <th>title</th>
                <th>type</th>
                <th>bandcamp</th>
            </tr>
        </thead>
        <tbody>
            {#each shownDugs as dug (dug.id)}
                <tr>
                    <!-- ID -->
                    <td>
                        {dug.id.replace('DUG', '')}
                    </td>

                    <!-- RELEASE DATE -->
                    <td>
                        {dug.year}
                    </td>

                    <!-- ALBUM -->
                    <td class="album">
                        <h4>{dug.title}</h4>
                        {#if !['Dug Alcedo'].includes(dug.artist)}
                            <p class="artist">{dug.artist}</p>
                        {/if}
                    </td>

                    <!-- TYPE -->
                    <td>
                        {dug.type}
                    </td>


                    <!-- link -->
                    <td class="link">
                        <a href={dug.bc_link} target="_blank">LINK</a>
                    </td>
                </tr>
                {#if dug.id === 'DUG020'}
                    <tr>
                        <th colspan="100">
                            {#if !showingMore}
                                <button onclick={() => showingMore = true}>
                                    MORE
                                </button>
                            {:else}
                                <p>the following music was made when i was a teenager and i don't think it's very good</p>
                            {/if}
                        </th>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
    .artist {
        font-style: italic;
        font-size: 0.8rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        position: relative;
    }

    thead {
        background-color: var(--lightgray);
        color: var(--black);
        position: sticky;
        top: -16px;
    }

    tbody > tr {
        &:not(:last-child) {
            & td {
                border-bottom: 1px dashed var(--semidarkgray);
            }

            &:hover td {
                border-bottom-color: var(--white);
            }
        }

        &:nth-child(odd) {
            background-color: var(--verydarkgray);
        }
    }

    tbody tr > td {
        &:not(:last-child) {
            border-right: 1px dotted var(--semidarkgray);
        }
    }

    th, td {
        padding: 5px;
    }

    .link {
        text-align: right;
        & a {
            display: inline-block;
            padding: 5px;
        }
    }
</style>