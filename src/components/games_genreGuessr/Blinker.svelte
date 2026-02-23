<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let interval: ReturnType<typeof setInterval> = $state(0 as any)
    let shown = $state(true)

    onMount(() => {
        interval = setInterval(() => {
            shown = !shown
        }, 500);
    })

    onDestroy(() => {
        clearInterval(interval)
    })
</script>

<div class="blinker" style="display: {shown ? 'block' : 'none'};"></div>

<style>
    .blinker {
        width: 3px;
        height: 2ch;
        left: .5rem;
        translate: 5px 5px;
        background-color: var(--bg);
    }
</style>