<script lang="ts">
    const {
        id
    } : {
        id: string
    } = $props()

    let loaded = $state(false)
</script>

<div class="bandcamp-player" style="width: 100%; height: 208px;">
    {#if !loaded}
        <div class="loading">
            LOADING BANDCAMP PLAYER...
        </div>
    {/if}
    <iframe
        onload={() => {
            loaded = true
        }}
        style="border: 0; width: calc(100% + 4px); height: calc(100% + 4px);"
        src="https://bandcamp.com/EmbeddedPlayer/album={id}/size=large/bgcol=333333/linkcol=8bc9b9/artwork=none/transparent=true/"
        title="Bandcamp Player"
        seamless
    ></iframe>
</div>

<style>
    .bandcamp-player {
        position: relative;
        overflow: hidden;

        & iframe {
            position: absolute;
            top: -2px;
            left: -2px;
            filter: contrast(1.35) sepia(1) saturate(1.5) hue-rotate(100deg);
        }

        &:hover {
            overflow: visible;
            & iframe {
                height: 500px !important;
                z-index: 500;
                outline: 1px dashed var(--gray);
            }
        }
    }
</style>