<script lang="ts">
    import { type Dug } from "../../lib/releases.js";

    const {
        dug
    } : {
        dug: Dug
    } = $props()
</script>

<a class="dug-card" href="/dug/{dug.id}">
    <img src="{dug.cover_s}" alt="album cover of {dug.title} by {dug.artist}">
    <div class="info">
        <h3>{dug.title}</h3>
        {#if !['Dug Alcedo', 'First Dog'].includes(dug.artist)}
            <div class="artist">by {dug.artist}</div>
        {/if}
    </div>
</a>

<style>
    .dug-card {
        position: relative;
        overflow: hidden;
        box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.2);

        & img {
            width: 100%;
            display: block;
        }

        .info {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: var(--black);
            color: var(--white);
            border-bottom: 1px solid var(--white);
            transition: bottom .5s;
        }

        & h3 {
            font-size: 0.9rem;
        }

        & .artist {
            font-size: 0.7rem;
        }

        &:hover {
            & .info {
                bottom: -300px;
            }
        }
    }
</style>