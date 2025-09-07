<script lang="ts">
    import CollageAlbumRow from "./CollageAlbumRow.svelte";
    import { createAlbumRows, type CollageAlbum as CollageAlbumType, type PopulatedCollageTier } from "./collageTypes.svelte.js";
    import { collageStore } from "./collageTypes.svelte.js";
    import { openModal } from "../../components/layout/modalStore.svelte.js";

    const {
        perRow,
        titlesFontSize,
        titlesToSide
    }: {
        perRow: number,
        titlesFontSize: number,
        titlesToSide: boolean
    } = $props()

    const handleAddTier = (d: 1 | -1) => {
        openModal({
            type: 'prompt',
            inputType: 'text',
            title: 'New tier name',
            defaultValue: '',
            onChange(val) {
                
            },
            validate(val) {
                val = val.trim().toLowerCase()
                if (!val) return "Required"
                if (collageStore.collageData.tiers.map(t => t.title.toLowerCase().trim()).includes(val)) {
                    return `You already have a tier called "${val}"`
                }
                if (val === 'untiered') {
                    return `You cannot call a tier this.`
                }
            },
        })
    }

</script>

<div id="collage-container tiered">
    {#each collageStore.populatedTiers as tier}
    {@const rows = createAlbumRows(tier.albums, perRow)}
        <div class="tier">
            <div class="left" style="background-color: {tier.color || "transparent"};">
                <h3 style="
                    writing-mode: {tier.title.length < 5 ? 'horizontal-tb' : 'vertical-lr'};
                ">
                    {tier.title}
                </h3>
                <div class="controls">
                    <button onclick={() => handleAddTier(-1)}>
                        Add tier above
                    </button>
                    <button>
                        Change name
                    </button>
                    <button>
                        Change color
                    </button>
                    <button onclick={() => handleAddTier(1)}>
                        Add tier below
                    </button>
                </div>
            </div>
            <div class="right">
                {#each rows as row}
                    <CollageAlbumRow
                        albums={row}
                        {perRow}
                        {titlesFontSize}
                        {titlesToSide}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>

    .tier {
        display: grid;
        grid-template-columns: 1fr 7fr;
        gap: .5rem;

        & > .left {
            max-width: 100%;
            overflow-x: hidden;
            border: 1px solid white;
            padding: .5rem;
            position: relative;

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
</style>