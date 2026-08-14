<script lang="ts">
    import { onMount } from "svelte";

    type JordanAlbum = {
        title: string
        artist_name: string
        sortRating: number
        displayRating: number
        year: number
        cover_art_url: string
    }

    let loading = $state(true)
    let failed = $state(false)
    let albums = $state<JordanAlbum[]>([])
    let hovered = $state<null|JordanAlbum>(null)
    const grouped = $derived.by(() => {
        const groups: JordanAlbum[][] = []
        for (let i = 0; i < 50; i+=5) {
            groups.push(albums.slice(i, i+5))
        }
        return groups
    })

    const handleHover = (a: HTMLAnchorElement, album: JordanAlbum) => {
        a.addEventListener('mouseenter', () => hovered = album)
        a.addEventListener('focus', () => hovered = album)
        a.addEventListener('mouseleave', () => hovered = null)
        a.addEventListener('blur', () => hovered = null)
    }

    onMount(async () => {
        try {
            const res = await fetch("https://demoose.vercel.app/api/jordan/list/1")
            const data = await res.json()
            albums = data.albums
            loading = false
        } catch {
            failed = true
        }
    })
</script>

<section id="DUGS_FAVS">
    <h2>dug's all-time favorite albums</h2>
    <br>
    {#if loading}
        <p>loading...</p>
    {:else if failed}
        <p class="error">something went wrong</p>
    {:else}
        <div id="FAVS">
            {#each grouped as group, i (group)}
                <div class="group">
                    <div class="left">
                        {#each group as album, j (album)}
                        {@const query = `${album.artist_name} ${album.title}`.replaceAll(' ','+')}
                            <a use:handleHover={album} class="no-button no-flicker" href="https://www.youtube.com/results?search_query={query}" target="_blank">
                                <img class:hovered={hovered===album} src={album.cover_art_url} alt="album cover of '{album.title}' by {album.artist_name}">
                            </a>
                        {/each}
                    </div>
                    <div class="right">
                        {#each group as album, j (album)}
                        {@const query = `${album.artist_name} ${album.title}`.replaceAll(' ','+')}
                            <a class:hovered={hovered===album} use:handleHover={album} target="_blank" class="no-flicker" href="https://www.youtube.com/results?search_query={query}">
                                <span class="n">{i*5 + j + 1}.</span>
                                <strong>{album.artist_name}</strong>
                                -
                                <em>{album.title}</em>
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</section>

<style>
    :global(:has(>#DUGS_FAVS)) {
        display: flex;
        flex-direction: column;
    }

    #DUGS_FAVS {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    #FAVS {
        flex-grow: 1;
        overflow-y: auto;

    }
    
    .group {
        display: grid;
        grid-template-columns: 1fr 600px;
        align-items: start;

        & .left {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: .5rem;
            margin-bottom: .5rem;

            & a {
                display: block;
            }

            & img {
                width: 100%;
                aspect-ratio: 1;
                object-fit: cover;
                display: block;

                &:hover, &.hovered {
                    outline: 3px dashed var(--comp);
                }
            }
        }

        & .right {
            margin-left: 1rem;
            font-size: .7rem;
            & > a {
                display: block;
                padding: .25rem 0;

                &:last-child {
                    margin-bottom: 2rem;
                }

                &:hover, &.hovered {
                    background-color: var(--comp);
                    color: var(--fg) !important;
                }
            }
        }
    }
</style>

