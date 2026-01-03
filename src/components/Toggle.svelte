<script lang="ts">

    type ToggleOption = {
        value: any
        text: string
    }

    let {
        value = $bindable(),
        options
    } : {
        value: any
        options: ToggleOption[]
    } = $props()

</script>

<div class="toggle">
    {#each options as option}
        <button
            class:selected={option.value === value}
            onclick={() => value = option.value}
        >
            {option.text}
        </button>
    {/each}
</div>

<style>
    .selected {
        border: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        background-color: rgba(255, 255, 255, 0.3);
    }
</style>