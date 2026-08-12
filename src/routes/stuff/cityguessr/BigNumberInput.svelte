<script lang="ts">
    import { onMount } from "svelte";

    let {
        emptyValue,
        displayedEmptyValue,
        value = $bindable(),
    }: {
        min: number
        max: number
        emptyValue: number,
        displayedEmptyValue: string,
        value: number
    } = $props()

    const sync = () => {
        if (!input) return
        if (!Number.isFinite(value)) {
            input.value = displayedEmptyValue
        }
        else {
            input.value = value.toLocaleString()
        }
    }

    let input = $state<HTMLInputElement>()

    $effect(() => {
        sync()
    })

    onMount(() => {
        sync()
    })

</script>

<input 
    bind:this={input}
    type="text"
    onblur={e => {
        const v = e.currentTarget.value.trim()
        const n = Number(v.replaceAll(',',''))
        
        // handle empty value
        if (!v || isNaN(n)) {
            value = emptyValue
            e.currentTarget.value = displayedEmptyValue
            return
        }

        e.currentTarget.value = n.toLocaleString()
    }}
>