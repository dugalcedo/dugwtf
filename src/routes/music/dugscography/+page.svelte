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
    <p>the following is a catalog of almost all of the music i have ever released</p>

    <table border="1" style="width: 100%;">
        <thead>
            <tr>
                <th>#</th>
                <th>title</th>
                <th>released</th>
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

                    <!-- ALBUM -->
                    <td class="album">
                        <h4>{dug.title}</h4>
                        {#if !['Dug Alcedo'].includes(dug.artist)}
                            <p class="artist">{dug.artist}</p>
                        {/if}
                    </td>

                    <!-- RELEASE DATE -->
                    <td>
                        {dug.year}
                    </td>

                    <!-- link -->
                    <td>
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
</style>