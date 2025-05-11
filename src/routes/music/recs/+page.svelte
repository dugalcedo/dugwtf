<script lang="ts">
    import recs from "../../../lib/recs.js";
    import SmallBandcampPlayer from "../../../components/misc/SmallBandcampPlayer.svelte";
</script>

<h2>independent artist recommendations</h2>
<p>please support these amazing independent artists</p>

<div class="recs">
    {#each recs as rec}
        <div class="rec">
            <h3>{rec.title}</h3>
            <p>by {rec.artist}</p>
            <SmallBandcampPlayer
                albumId={rec.bc_album_id}
                trackId={rec.bc_track_id}
            />
        </div>
    {/each}
</div>

<style>
    .rec {
        padding: 1rem 0;

        & h3 {
            font-style: italic;
        }
    }

    .recs > .rec:not(:last-child) {
        border-bottom: 1px dashed var(--gray);
    }
</style>