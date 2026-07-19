<script lang="ts">
    import type { Dug } from "$lib/clientData/dugs";
    import { openBcPlayer } from "$lib/stores/bcPlayerStore.svelte";
    let { 
        dug, 
        filter, 
        selectedDugId = $bindable() 
    }: 
    { 
        dug: Dug, 
        filter?: string, 
        selectedDugId: string | null 
    } = $props()

    const alt = $derived(`${dug.title} by ${dug.artist}`)
    const selected = $derived(selectedDugId === dug.id)

    const handleSelect = () => {
        selectedDugId = dug.id
    }
</script>

<div
    class="item"
    tabindex="0"
    onclick={handleSelect}
    onkeypress={handleSelect}
    role="button"
    class:selected={selected}
    class:funny-bg1-outline={selected}
>
    {#if dug.hasIcon}
        <img class="cover" src="/images/album_icons/{dug.id}.png" alt={alt}>
    {:else}
        <img 
            src={dug.cover_s} 
            alt={alt} 
            class="cover"
            style="
                filter: {filter};
                mix-blend-mode: lighten;
            "
        >
    {/if}

    {#if selected}
        <div class="controls funny-bg1-outline">
            <button class="no-flicker" onclick={() => openBcPlayer(dug)}>
                play
            </button>
            <a class="no-flicker" href="/dugscography/{dug.id}">
                info
            </a>
            <a class="no-flicker" href={dug.bc_link} target="_blank">download</a>
        </div>
    {/if}

    <!-- abs-positioned stuff -->
    <div class="title">
        <h5>{dug.title}</h5>
        <p>{dug.year}</p>
    </div>
</div>

<style>
    .item {
        position: relative;
        border: 0;
        padding: 0;
        cursor: pointer;

        & .cover {
            width: 100%;
        }

        & .title {
            display: none;
            pointer-events: none;
            user-select: none;
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            text-align: center;
            background-color: var(--comp);
            color: var(--fg);

            & p {
                font-size: .7rem;
            }
        }

        &:hover:not(.selected) .title {
            display: block;
        }

    }

    .item.selected {
        background-color: var(--bg1);
        padding: .25rem;
        position: relative;
    }

    .controls {
        position: absolute;
        display: flex;
        flex-direction: column;
        z-index: 50;
        background-color: var(--bg1);
        width: 100%;
        left: 0;

        & > * {
            text-decoration: underline;
            display: block;
            text-align: center;
            flex-grow: 1;
            padding: 1rem .25rem;
            border: 0;

            &:hover {
                background-color: var(--comp);
                color: var(--fg);
            }
        }
    }
    
    .item:hover .cover, .item.selected .cover {
        animation: cover 1s linear infinite;
    }

    @keyframes cover {
        0% {
            transform: scaleX(1) scaleY(1);
        }
        25% {
            transform: scaleX(0.9) scaleY(1.1);
        }
        75% {
            transform: scalex(1.1) scaleY(0.9);
        }
        100% {
            transform: scaleX(1) scaleY(1);
        }
    }
</style>