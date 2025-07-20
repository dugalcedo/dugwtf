<script lang="ts">
    import { type Dug } from "../lib/releases.js";

    const {
        dug
    } : {
        dug: Dug
    } = $props()
</script>

<iframe title="bandcamp player" style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album={dug.bc_id}/size=small/bgcol=2cffb9/linkcol=000000/artwork=none/transparent=true/" seamless></iframe>
