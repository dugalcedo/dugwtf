<script lang="ts">
    import { dugPlayer, pause, unpause } from "$lib/clientData/playDugs.svelte";
</script>

<!-- keyed off nowPlaying, not playing, so the play button survives a pause -->
{#if dugPlayer.nowPlaying}
    <div id="DUGPLAYERNOWPLAYING">
        {dugPlayer.playing ? 'playing' : 'paused'}:
        <a target="_blank" href="/dugscography/{dugPlayer.nowPlaying?.dug?.id}">"{dugPlayer.nowPlaying?.track?.title}" [{dugPlayer?.nowPlaying?.dug?.title}]</a>
        <button class="no-flicker" onclick={() => dugPlayer.playing ? pause() : unpause()}>
            {dugPlayer.playing ? 'pause' : 'play'}
        </button>
    </div>
{/if}

<style>
    #DUGPLAYERNOWPLAYING {
        position: fixed;
        top: 0;
        left: 50%;
        translate: -50% 0;
        background-color: var(--hl);
        color: var(--bg);
        font-size: .7rem;

        & a {
            color: var(--bg) !important;
        }

        & button {
            color: var(--bg);
            padding: .125rem;
            font-size: .5rem;
        }
    }
</style>