<script lang="ts">
    import Form from "../../components/Form.svelte";
    import LoadingDots from "../../components/LoadingDots.svelte";

    let submittingTicket = $state(false)
    let ETA = $state(0)
    let albumsFound: AlbumResult[] | null = $state(null)

    type TicketResult = {
        data: {
            ticket: string,
            estimatedWaitTime: number
        }
    }

    type AlbumResult = {
        id: number
        master_id: number
        title: string
        cover_image: string
    }

    const handleCreateTicket = (result: TicketResult) => {
        ETA = result.data.estimatedWaitTime
        submittingTicket = true
        handleSubmitTicket(result.data.ticket)
    }

    const handleSubmitTicket = async (ticket: string) => {
        const res = await fetch(`/api/albumSearch/submitTicket?ticket=${ticket}`)
        const data = await res.json()
        console.log(data)
        albumsFound = data?.data || []
        submittingTicket = false
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
                    <input type="text" id="albumSearchForm_artist" name="artist" required autocomplete="off">
                </div>
                <div class="field">
                    <label for="albumSearchForm_album">album</label>
                    <input type="text" id="albumSearchForm_album" name="album" required autocomplete="off">
                </div>
            </div>
        </Form>
    {/if}
    {#if albumsFound && !submittingTicket}
        {#if albumsFound.length == 0}
            <p>No results found.</p>
        {:else}
            <div class="albums-found">
                {#each albumsFound as album}
                    <div class="album">
                        <img src="{album.cover_image}" alt="album cover of {album.title}">
                        <p>{album.title}</p>
                    </div>
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

    .album {
        & img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
        }
    }
</style>