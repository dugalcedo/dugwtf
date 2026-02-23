<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        head,
        children,
        shown = $bindable(),
        confirmBtn,
        cancelBtn,
        confirmBtnRed = false,
        onConfirm
    }: {
        head?: Snippet
        children: Snippet
        shown: boolean
        confirmBtn?: string
        confirmBtnRed?: boolean
        cancelBtn?: string
        onConfirm?: (data: Record<string, any>) => void
    } = $props()

    let modal: undefined | HTMLDivElement = $state();
    let form: undefined | HTMLFormElement = $state();

    $effect(() => {
        if (shown) {
            armForm()
        }
    })

    const handleModalBackdropClick = (e: MouseEvent | KeyboardEvent) => {
        if (e.target !== e.currentTarget) return;
        shown = false
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        let data: any = {}
        if (form) data = Object.fromEntries(new FormData(form));
        if (onConfirm) onConfirm(data)
        shown = false
    }

    const handleConfirmBtnClick = () => {
        if (form) {
            form.requestSubmit()
        } else if (onConfirm) {
            onConfirm({})
        }
        shown = false
    }

    const armForm = () => {
        const forms = modal!.querySelectorAll<HTMLFormElement>(':scope form')
        if (forms.length > 1) throw new Error(`A modal cannot contain more than one form.`)
        if (forms.length) form = forms[0];
        if (form) form.onsubmit = handleSubmit
    }

</script>

{#if shown}
<div 
    class="modal-backdrop" 
    onclick={handleModalBackdropClick}
    onkeypress={handleModalBackdropClick}
    role="button"
    tabindex="-1"
>
    <div class="modal" bind:this={modal}>
        {#if head}
            <div class="head">
                {@render head()}
            </div>
        {/if}
        <div class="body">
            {@render children()}
        </div>
        {#if confirmBtn || cancelBtn}
            <div class="foot">
                {#if cancelBtn}
                    <button onclick={() => shown = false}>
                        {cancelBtn}
                    </button>
                {/if}
                {#if confirmBtn}
                    <button onclick={handleConfirmBtnClick} aria-label="submit form" class:red={confirmBtnRed}>
                        {confirmBtn}
                    </button>
                {/if}
            </div>
        {/if}
    </div>
</div>
{/if}

<style>
    .modal-backdrop {
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

    .red {
        background-color: maroon;
    }
</style>