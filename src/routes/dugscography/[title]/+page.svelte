<script lang="ts">
    import { dugs, type Dug } from "$lib/clientData/dugs";
    import { makeMoreReadable } from "$lib/util/makeMoreReadable";

    const {
        params
    }: {
        params: {
            title: string
        }
    } = $props()

    // svelte-ignore state_referenced_locally
    const dug: null | Dug = dugs[params.title]
</script>

{#if !dug}
    <p>not found</p>
{:else}
{@const article = "aeiou".includes(dug?.type[0].toLowerCase()) ? "an" : "a"}

    <div class="dugpage res-left">

        <div class="cover-and-info">
            <img src={dug.cover_l} alt="album cover of '{dug.title}' by '{dug.artist}'" class="cover">
            <div class="info">
                <div class="inline" use:makeMoreReadable>
                    <h2>{dug.title}</h2>
                    <p>
                        is {article} {dug.type} released in {dug.year} under the artist-name <a href="/artists/{dug.artist}">{dug.artist}</a>. {dug.desc||""}
                    </p>
                </div>
            </div>
        </div>

    </div>
{/if}

<style>
    .inline {
        & > * {
            display: inline;
        }
    }

    .cover {
        width: 100%;
    }
</style>