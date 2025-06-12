<script lang="ts">
    import { featuredDugs } from "../../lib/releases.js";
    import BandcampPlayer from "../../components/misc/BandcampPlayer.svelte";
    const showns = $state<boolean[]>(featuredDugs.map(() => false))
</script>

<h2>Featured releases</h2>

<div class="featureds">
    {#each featuredDugs as dug, i (dug.id)}
        <div class="featured">

            <!-- Cover and title -->
            <div class="cover-title">
                <a href={dug.bc_link} target="_blank">
                    <img src={dug.cover_s} alt="Album cover of {dug.title}">
                </a>
                <h3>{dug.title}</h3>
                {#if dug.artist !== 'Dug Alcedo'}
                    <p class="artist">{dug.artist}</p>
                {/if}
            </div>

            <!-- Player -->
            <div class="player">
                {#if showns[i]}
                    <BandcampPlayer id={dug.bc_id} />
                {:else}
                    <button onclick={() => {
                        for (let j = 0; j < showns.length; j++) {
                            showns[j] = i == j 
                        }
                    }}>
                        show bandcamp player
                    </button>
                {/if}
            </div>

        </div>
    {/each}
</div>

<style>
    .featureds {
        & > .featured {
            display: grid;
            grid-template-columns: 1fr 2fr;

            &:nth-child(even) {
                grid-template-columns: 2fr 1fr;

                & .player {
                    order: -1;
                }
            }

            margin-bottom: 1rem;
        }
    }

    .cover-title {
        padding: 1rem;

        & img {
            width: 100%;
            mix-blend-mode: luminosity;
            filter: contrast(1.5);
        }
    }

    .artist {
        font-size: 0.8rem;
        font-style: italic;
    }
</style>