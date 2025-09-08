<script lang="ts">
    import CollageAlbumRow from "./CollageAlbumRow.svelte";
    import { addTier, createAlbumRows, deleteTier, moveAlbumToDifferentTier } from "./collageTypes.svelte.js";
    import { collageStore } from "./collageTypes.svelte.js";
    import Modal from "../../components/Modal.svelte";

    const {
        perRow,
        titlesFontSize,
        titlesToSide,
        collageType
    }: {
        perRow: number,
        titlesFontSize: number,
        titlesToSide: boolean,
        collageType: 'classic' | 'tiered'
    } = $props()

    let addTierModalShown = $state(false)
    let addTierError = $state("")
    let addTierAdjacentTier = $state(-1)
    let addTierDelta: 1 | -1 = $state(-1)

    const openAddTierModal = (d: 1 | -1, adjacentTierIndex: number) => {
        addTierDelta = d
        addTierAdjacentTier = adjacentTierIndex
        addTierModalShown = true
    }
    
    const handleAddTier = (data: any) => {
        addTierError = ""
        data.title = data.title.toUpperCase().trim()

        if (collageStore.collageData.tiers.map(t => t.title.toUpperCase().trim()).includes(data.title)) {
            addTierError = `You already have a tier with that name`
            return
        }

        if (data.title == "UNTIERED") {
            addTierError = `You can't call a tier "untiered"`
            return
        }

        addTier(data.title, data.color, addTierDelta, addTierAdjacentTier)
        addTierModalShown = false
    }

</script>

<div id="collage-container tiered">
    {#each collageStore.populatedTiers as tier, i}
    {@const rows = createAlbumRows(tier.albums, perRow)}
        <div class="tier">
            <div class="left" style="background-color: {tier.color || "transparent"};">
                <h3 style="
                    writing-mode: {tier.title.length < 5 ? 'horizontal-tb' : 'vertical-lr'};
                ">
                    {tier.title}
                </h3>

                <!-- Only show if not moving an album -->
                {#if collageStore.beingMovedIndex === -1}
                    <div class="controls">
                        <button onclick={() => openAddTierModal(-1, i)}>
                            Add tier above
                        </button>
                        {#if tier.title != 'untiered'}
                            <button>
                                Edit
                            </button>
                            <button onclick={() => deleteTier(i)}>
                                DELETE
                            </button>
                            <button onclick={() => openAddTierModal(1, i)}>
                                Add tier below
                            </button>
                        {/if}
                    </div>
                {:else}
                    <div class="tier-controls">
                        <button onclick={() => {
                            moveAlbumToDifferentTier(collageStore.beingMovedIndex, i)
                        }}>
                            Move to this tier
                        </button>
                    </div>
                {/if}

            </div>
            <div class="right">
                {#each rows as row}
                    <CollageAlbumRow
                        albums={row}
                        {perRow}
                        {titlesFontSize}
                        {titlesToSide}
                        moveTierOnMove={true}
                        {collageType}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>

<!-- ADD TIER MODAL -->
<Modal 
    bind:shown={addTierModalShown}
    confirmBtn="Add tier"
    cancelBtn="Cancel"
    onConfirm={handleAddTier}
>
    {#snippet head()}
        Add tier
    {/snippet}
    <form>
        <div class="field">
            <label for="addTier_title">Title</label>
            <input type="text" id="addTier_title" required name="title">
        </div>
        <div class="field">
            <label for="addTier_color">Color</label>
            <input type="color" id="addTier_color" required name="color">
        </div>
        <span class="error">{addTierError}</span>
    </form>
</Modal>

<style>

    .tier {
        display: grid;
        grid-template-columns: 1fr 7fr;
        gap: .5rem;
        min-height: 200px;

        & > .left {
            max-width: 100%;
            overflow-x: hidden;
            border: 1px solid white;
            padding: .5rem;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: space-between;

            & > .controls {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 5;
                background-color: black;

                & button {
                    padding: .25rem;
                    font-size: .8rem;
                    background-color: white;
                    color: black;
                    flex-grow: 1;
                }
            }

            &:hover > .controls {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }

        & > .right {
            display: flex;
            flex-direction: column;
            row-gap: .5rem;
        }
    }

    .tier-controls {
        & button {
            font-size: .8rem;
            width: 100%;
            padding: .25rem;
            background-color: aquamarine;
            color: black;
        }
    }
</style>