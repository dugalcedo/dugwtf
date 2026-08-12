<script lang="ts">
    import { countries, continents } from "./service";
    import { cgState } from "./cgState.svelte";

    const {
        type
    }: {
        type: 'countries' | 'continents'
    } = $props()

    let items = $derived(type === 'continents' ? continents : countries)
    let initItems = $derived(type === 'continents' ? cgState.init.cityOpts.continents : cgState.init.cityOpts.countries)

    const update = () => {
        if (type === 'continents') {
            cgState.init.cityOpts.continents = new Set(initItems)
        }
        else {
            cgState.init.cityOpts.countries = new Set(initItems)
        }
    }

    const handleSelect = (item: string) => {
        if (initItems === 'all') {
            initItems = new Set(items)
            initItems.delete(item)
        }
        else {
            if (!initItems) return;
            if (initItems.has(item)) initItems.delete(item)
            else initItems.add(item)
        }
        update()
    }

    const handleSelectAll = () => {
        initItems = 'all'
        update()
    }

    const handleSelectNone = () => {
        initItems = new Set()
        update()
    }
</script>

<div class="area-selector">
    <h4>{type}</h4>
    <div class="meta">
        <button class="no-flicker" onclick={handleSelectAll}>ALL</button>
        <button class="no-flicker" onclick={handleSelectNone}>NONE</button>
    </div>
    <div class="items">
        {#each items as item (item)}
        {@const selected = (initItems === 'all') || initItems.has(item)}
            <button 
                class="no-flicker" 
                class:deselected={!selected}
                onclick={() => handleSelect(item)}
            >
                {item}
            </button>
        {/each}
    </div>
</div>

<style>
    .area-selector {
        width: 300px;
    }

    .meta {
        display: flex;
        & > button {
            flex-grow: 1;
            font-size: .8rem;
        }
    }
    
    .items {
        display: flex;
        flex-wrap: wrap;
        max-height: 500px;
        overflow-y: auto;

        & > button {
            flex-grow: 1;
            font-size: .7rem;
            border-width: 1px;

            &.deselected {
                color: var(--fg5);
                border-color: var(--fg5);
            }
        }
    }
</style>