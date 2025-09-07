<script lang="ts">
    import { closeModal, modalStore } from "./modalStore.svelte.js";
    import ModalPrompt from "./Modal_Prompt.svelte";
</script>

{#if modalStore.modal}
    <button class="modal-backdrop" onclick={e => {
        if (e.currentTarget === e.target) closeModal()
    }}>
        <div class="modal">
            {#if modalStore.modal.type === 'prompt'}
                <ModalPrompt modal={modalStore.modal} />
            {/if}
        </div>
    </button>
{/if}

<style>
    :global(.modal-backdrop) {
        border: 0;
        position: fixed;
        left: 0;
        top: 0;
        width: 100dvw;
        height: 100dvh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.7);
        cursor: default;

        &:hover {
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-weight: normal;
        }
    }

    :global(.modal) {
        background-color: black;
        min-width: 300px;
        max-width: 500px;
        width: 100%;

        & > .head {
            background-color: #333;
            color: white;
            font-size: 1.5rem;
            padding: 0 .5rem;
        }

        & > .body {
            padding: 1rem .5rem;
        }

        & > .foot {
            background-color: #333;
            color: white;
            display: flex;
            justify-content: flex-end;

            :global(& > button) {
                font-size: .8rem;

                &.ok {
                    background-color: #367836;
                }
            }
        }
    }
</style>