<script lang="ts">
    import Form from "../../../components/Form.svelte";
    import LoadingDots from "../../../components/LoadingDots.svelte";
    import type { AlbumResult, TicketResult } from "../collageTypes.svelte.js";
    import Album from "./SearchedAlbum.svelte";

    let submittingTicket = $state(false)
    let ETA = $state(0)
    let albumsFound: AlbumResult[] | null = $state(null)

    let artist_input: null | HTMLInputElement = $state(null)
    let artist_value = $state("")
    let album_value = $state("")

    const handleCreateTicket = (result: TicketResult) => {
        ETA = result.data.estimatedWaitTime
        submittingTicket = true
        handleSubmitTicket(result.data.ticket)
    }

    const handleSubmitTicket = async (ticket: string) => {
        const res = await fetch(`/api/albumSearch/submitTicket?ticket=${ticket}`)
        const data = await res.json()
        albumsFound = data?.data || []
        submittingTicket = false
        artist_input?.focus()
    }

</script>

<div class="res">
    {#if submittingTicket}
        <div class="submitting-ticket">
            <p>Now searching for an album.</p>
            <p>Your estimated wait time is {(ETA/1000).toFixed(1)} second(s)</p>
            <LoadingDots />
        </div>
    {:else}
        <Form
            buttonText="Search"
            url="/api/albumSearch/createTicket"
            method="GET"
            formDataToParams={true}
            onSuccess={handleCreateTicket}
        >
            <div class="head">
                <h3>Search for an album</h3>
            </div>
            <div class="body">
                <div class="field">
                    <label for="albumSearchForm_artist">artist</label>
                    <input bind:this={artist_input} type="text" id="albumSearchForm_artist" name="artist" autocomplete="off" bind:value={artist_value}>
                </div>
                <div class="field">
                    <label for="albumSearchForm_album">album</label>
                    <input type="text" id="albumSearchForm_album" name="album" autocomplete="off" bind:value={album_value}>
                </div>
            </div>
        </Form>
    {/if}
    {#if albumsFound && !submittingTicket}
        {#if albumsFound.length == 0}
            <p>No results found.</p>
        {:else}
            <div class="albums-found">
                {#each albumsFound as album, i (album.id)}
                    <Album {album} />
                {/each}
            </div>
        {/if}
    {/if}
</div>

<style>
    .albums-found {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (min-width: 500px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (min-width: 650px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media (min-width: 800) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>