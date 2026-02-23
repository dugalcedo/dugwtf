<script lang="ts">
    import Modal from "../../components/Modal.svelte";
    import { collageStore, deleteCollage } from "./collage.svelte.js";
    import AddCollageForm from "./search/AddCollageForm.svelte";

    let deleteCollageModalShown = $state(false)

    const handleDeleteCollage = (name: string) => {
        collageStore.selectedCollage = name
        deleteCollageModalShown = true
    }

</script>

<div class="container">
    <div class="head">
        <img src="/icons/grid.svg" alt="grid">
        Collage selection
    </div>
    <div class="body">
        {#if collageStore.data.collages.length == 0}
            <p style="text-align: center; font-size: 0.8rem; font-style: italic;">You don't have any collages yet</p>
        {:else}
            <div class="collage-selector" class:glowing={collageStore.data.collages.length && !collageStore.selectedCollage}>
                <p style="
                    text-align: center;
                ">
                    &darr;&darr;&darr; SELECT A COLLAGE &darr;&darr;&darr;
                </p>
                <div class="collages">
                    {#each collageStore.data.collages as list (list.name)}
                        <div class="collage">
                            <button class="sel" onclick={() => collageStore.selectedCollage = list.name} class:selected={list.name == collageStore.selectedCollage}>
                                {list.name}
                            </button>
                            <button class="del" onclick={() => handleDeleteCollage(list.name)}>
                                &times;
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        
        
        {#if collageStore.data.collages.length < 3}
            <div class="add-collage-form" class:glowing={collageStore.data.collages.length === 0}>
                <AddCollageForm />
            </div>
        {:else}
            <p style="text-align: center; font-size: 0.7rem; font-style: italic;">You have the maximum allowed number of collages (3)</p>
        {/if}
    </div>
</div>

<Modal 
    bind:shown={deleteCollageModalShown} 
    confirmBtn="DELETE"
    confirmBtnRed={true}
    cancelBtn="nevermind"
    onConfirm={deleteCollage}
>
    {#snippet head()}
        Are you sure you want to delete "{collageStore.selectedCollage}"?
    {/snippet}
    The collage and all of its albums will be permanently erased. This cannot be undone.
</Modal>

<style>
    .container {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid white;

        & > .head {
            background-color: white;
            color: black;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px;

            & img {
                width: 25px;
            }
        }

        & > .body {
            padding: 5px;
        }
    }

    .container, .container * {
        font-size: .8rem !important;
    }

    .collages {
        display: flex;
        & > * {
            flex-grow: 1;
            position: relative;

            & .sel {
                width: 100%;

                &.selected {
                    background-color: aquamarine;
                    color: black;
                }
            }

            & .del {
                z-index: 5;
                position: absolute;
                bottom: 0;
                right: 0;
                background-color: maroon;
                padding: 0;
                width: 25px;
                height: 100%;
                display: none;
            }

            &:hover .del {
                display: block;
            }
        }
    }

    .collage-selector, .add-collage-form {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .glowing {
        animation: glow infinite 1s linear;
    }

    @keyframes glow {        
        0% {
            box-shadow: 0 0 20px rgba(0, 238, 178, 0.1);
        }
        50% {
            box-shadow: 0 0 20px rgba(0, 238, 178, 1);
        }
        100% {
            box-shadow: 0 0 20px rgba(0, 238, 178, 0.1);
        }
    }

    :global(.add-collage-form form) {
        margin-bottom: 0;
    }
</style>