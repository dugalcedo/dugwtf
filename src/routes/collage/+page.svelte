<script lang="ts">
    import CollageAlbum from "./CollageAlbum.svelte";
    import { collageStore } from "./collageTypes.svelte.js";
    const tiers = $derived(collageStore.tiers)
</script>

<div class="res">
    My Collage
    <div id="collage-container">
        <div id="collage">
            <div id="tiers">
                {#each tiers as tier (tier.title)}
                    <div class="tier">
                        <div class="albums">
                            {#each tier.albums as album, i (album.id)}
                                <CollageAlbum {i} {album} />
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="text">
            {#each tiers as tier (tier.title)}
                <div class="text-tier">
                    {#each tier.albums as album (album.id)}
                        <p>{album.title}</p>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    #collage-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }

    .tier {
        & .albums {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 1rem;
        }
    }

    .text-tier {
        font-size: .7rem;
    }
</style>