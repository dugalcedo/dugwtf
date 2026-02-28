<script lang="ts">
    let {
        value = $bindable(),
        min,
        max,
        step = 1,
        id = "",
        name = ""
    } : {
        value: number,
        min: number,
        max: number,
        step?: number,
        id?: string,
        name?: string
    } = $props()

    const handleChange = (delta: 1 | -1) => {
        let newValue = value + (step*delta)
        value = newValue > max ? max : newValue < min ? min : newValue;
    }
</script>

<div class="number-input">
    <button type="button" onclick={() => handleChange(-1)}>&minus;</button>
    <span>{value}</span>
    <button type="button" onclick={() => handleChange(1)}>&plus;</button>
</div>

<div class="hidden-input">
    <input type="number" bind:value={value} name={name} id={id} min={min} max={max} step={step}>
</div>

<style>
    .number-input {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        & span {
            text-align: center;
        }
    }

    button {
        font-weight: bold;
        font-size: 1rem;
        padding: 0rem 1rem;
    }

    .hidden-input {
        width: 0px;
        height: 0px;
        padding: -1px;
        margin: -1px;
        overflow: hidden;
        user-select: none;
    }
</style>