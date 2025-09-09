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
    {#if collageStore.data.collages.length == 0}
        <p style="text-align: center; font-size: 0.8rem; font-style: italic;">You don't have any collages yet</p>
    {:else}
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
    {/if}
    
    
    {#if collageStore.data.collages.length < 3}
        <AddCollageForm />
    {:else}
        <p style="text-align: center; font-size: 0.7rem; font-style: italic;">You have the maximum allowed number of collages (3)</p>
    {/if}
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
</style>