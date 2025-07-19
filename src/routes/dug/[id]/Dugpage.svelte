<script lang="ts">
    import { type Dug } from "../../../lib/releases.js";

    const {
        next,
        prev,
        dug
    } : {
        next?: string,
        prev?: string,
        dug: Dug
    } = $props()

</script>

<div class="res dugpage">
    <div class="nav">
        <div>
            {#if prev}
                <a href="/dug/{prev}">
                    <button>&larr; prev</button>
                </a>
            {/if}
        </div>
        <div>
            {#if next}
                <a href="/dug/{next}">
                    <button>next &rarr;</button>
                </a>
            {/if}
        </div>
    </div>
    <img class="cover" src="{dug.cover_l}" alt="album cover of {dug.title} by {dug.artist}">
    <div class="info">
        <h2 class="id">{dug.id}</h2>
        <h2 class="title">{dug.title}</h2>
    </div>
    <div class="links">
        <a href="{dug.bc_link}" target="_blank">
            <button>
                BUY / LISTEN ON
                <br> BANDCAMP
            </button>
        </a>
    </div>
</div>

<style>
    .nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        margin-bottom: 8px;

        & button {
            width: 100%;
            padding: 4px;
        }
    }

    .dugpage {
        display: grid;

        & .cover {
            width: 100%;
        }

        & .id {
            color: var(--black);
            text-shadow: 
                1px 1px 0px var(--white),
                1px -1px 0px var(--white),
                -1px -1px 0px var(--white),
                -1px 1px 0px var(--white)
            ;
        }

        & .title {
            background-color: var(--white);
            color: var(--black);
            text-align: right;
            font-style: italic;
            padding-right: .5rem;
        }
    }

    .links {
        & button {
            width: 100%;
            margin: 4px 0;
            padding: .5rem;
            font-size: 1rem;
        }
    }
</style>