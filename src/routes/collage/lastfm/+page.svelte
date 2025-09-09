<script lang="ts">
    import { addAlbum, collageStore, type AlbumResult } from "../collage.svelte.js";
    import Form from "../../../components/Form.svelte";
    import NumberInput from "../../../components/NumberInput.svelte";
    import { goto } from "$app/navigation";

    let lastFmAlbums: null | AlbumResult[] = $state(null)

    const handleAddAlbums = () => {
        if (!lastFmAlbums) return;
        lastFmAlbums.forEach(alb => addAlbum(alb))
        goto("/collage")
    }

    const handleReplaceAlbums = () => {
        if (!lastFmAlbums) return
        const collage = collageStore.data.collages.find(col => col.name == collageStore.selectedCollage)
        if (!collage) return
        collage.albums = []
        handleAddAlbums()
    }

</script>

{#if !collageStore.selectedCollage}
    <p>Select a collage to continue</p>
{:else if !lastFmAlbums}
    <Form
        buttonText="Search"
        url="/api/lastfm/createAndSubmitTicket"
        method="GET"
        formDataToParams={true}
        onSuccess={(data) => {
            lastFmAlbums = data.data
        }}
    >
        <div class="head">Get Last.fm top albums</div>
        <div class="body">
            <div class="field">
                <label for="searchLastfm_username">Last.fm username</label>
                <input type="text" id="searchLastfm_username" name="username" required>
            </div>
            <div class="field">
                <label for="searchLastfm_period">Period</label>
                <select name="period" id="searchLastfm_period">
                    <option value="overall">overall</option>
                    <option value="7day">7day</option>
                    <option value="1month">1month</option>
                    <option value="3month">3month</option>
                    <option value="6month">6month</option>
                    <option value="12month">12month</option>
                </select>
            </div>
            <div class="field">
                <label for="searchLastfm_limit">Limit</label>
                <NumberInput 
                    id="searchLastfm_limit"
                    name="limit"
                    value={20}
                    min={5}
                    max={200}
                />
            </div>
        </div>
    </Form>
{:else}
    <!-- SEARCH RESULTS -->
    <ul>
        {#each lastFmAlbums as alb}
            <li>{alb.title}</li>
        {/each}
    </ul>
    <button onclick={handleAddAlbums}>
        Add albums to "{collageStore.selectedCollage}"
    </button>
    <button onclick={handleReplaceAlbums}>
        Replace all albums in "{collageStore.selectedCollage}"
    </button>
{/if}