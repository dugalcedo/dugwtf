<script lang="ts">
    import type { Snippet } from "svelte";

    const {
        children,
        label,
        name,
        error,
        id,
        _class = "",
        style = "",
    }: {
        children: Snippet
        label: string
        name: string
        id: string
        error?: string
        _class?: string
        style?: string
    } = $props()

    
</script>

<div data-name={name} class="field {_class}" class:has-error={!!error} style={style}>
    <label for={id}>{label}</label>
    <div class="input-area">{@render children()}</div>
    {#if error}
        <span data-name={name} class="error">{error}</span>
    {/if}
</div>

<style>
    .field {
        display: grid;
        grid-template-columns: 1fr 1fr;
        position: relative;
    }

    .has-error {
        & > label {
            border-left: 10px solid var(--error);
            color: var(--error);
            padding-left: 4px;
        }

        & > .input-area {
            outline: 2px dashed var(--error);
        }
    }

    :global(.input-area input, .input-area select, .input-area textarea) {
        width: 100%;
    }
 
    .error {
        background-color: var(--error);
        color: var(--fg);
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: .7em;
        opacity: 0.7;
        pointer-events: none;
    }
</style>