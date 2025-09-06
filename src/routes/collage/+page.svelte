<script lang="ts">
    import CollageAlbum from "./CollageAlbum.svelte";
    import { collageStore } from "./collageTypes.svelte.js";

    console.log(collageStore)

</script>

<div class="res">
    My Collage
    <div id="collage">
        <div id="tiers">
            {#each collageStore.tiers as tier (tier.title)}
                <div class="tier">
                    <div class="albums">
                        {#each tier.albums as album (album.id)}
                            <CollageAlbum {album} />
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .tier {
        & .albums {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>