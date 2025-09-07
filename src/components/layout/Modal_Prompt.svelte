<script lang="ts">
    import { closeModal, type ModalConfig_prompt } from "./modalStore.svelte.js";
    import { onMount } from "svelte";


    const {
        modal
    } : {
        modal: ModalConfig_prompt
    } = $props()

    let input: null | HTMLInputElement = $state(null)
    let value = $state(modal.defaultValue)
    let error = $state("")

    onMount(()=>{
        input!.focus()
    })

    const handleConfirm = () => {
        error = "";
        if (modal.validate) error = modal.validate(value) || "";
        if (error) return;
        modal.onChange(value)
    }

</script>

<div class="head">
    {modal.title}
</div>
<div class="body">
    <input 
        type={modal.inputType} 
        bind:this={input}
        bind:value={value}
        onkeyup={e => {
            if (e.key !== 'Enter') return;
            handleConfirm()
        }}
    >
    {#if error}
        <span class="error">{error}</span>
    {/if}
</div>
<div class="foot">
    <button onclick={closeModal}>Cancel</button>
    <button class="ok" onclick={handleConfirm}>OK</button>
</div>

<style>
    input {
        width: 100%;
    }
</style>