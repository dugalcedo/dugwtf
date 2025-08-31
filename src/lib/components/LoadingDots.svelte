<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    const { max = 5 }: { max?: number } = $props()
    let count = $state(1)

    let interval: any;

    onMount(() => {
        interval = setInterval(() => {
            let nextCount = count + 1;
            if (nextCount > max) nextCount = 1;
            count = nextCount;
        }, 333)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

</script>

<span>{".".repeat(count)}</span>