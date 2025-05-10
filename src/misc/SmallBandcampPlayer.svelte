<script lang="ts">
    const {
        albumId,
        trackId
    }: {
        albumId: string,
        trackId: string
    } = $props()
</script>

<div class="small-bandcamp-player" style="
    width: 100%;
    height: 42px;
    position: relative;
    overflow: hidden;
">
    <iframe
        title="bandcamp player"
        style="
            border: 0; 
            width: 100%; 
            height: 42px;
            transform-origin: center;
            image-rendering: pixelated;
            transform: scaleY(1.05) scaleX(1.02);
            filter: sepia(1) hue-rotate(100deg) saturate(0.6) brightness(0.89) contrast(1.4);
        "

        src="https://bandcamp.com/EmbeddedPlayer/album={albumId}/size=small/bgcol=333333/linkcol=ffffff/artwork=none/track={trackId}/transparent=true/" seamless
    ></iframe>
</div>