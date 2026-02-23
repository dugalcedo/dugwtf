<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    const CHARS = [
        { char: ".", style: "top: 0;" },
        { char: "_", style: "top: 0;" },
        { char: "~", style: "top: 0.5ch;" },
        { char: "▪", style: "top: 0.5ch;"},
        { char: "*", style: "top: 0.6ch;"},
        { char: "°", style: "top: 0.8ch;" },
        { char: "͚", style: "top: -0.2ch;" },
        { char: "⁎", style: "top: 0;" },
        { char: "☯", style: "top: 0.2ch; font-size: 0.3em;" }
    ]

    let charIdx = $state(0);
    let interval = $state<ReturnType<typeof setInterval>>(0)

    onMount(() => {
        interval = setInterval(() => {
            charIdx = getNextIdx();
        }, 1500);
    })

    onDestroy(() => {
        if (interval) clearInterval(interval)
    })

    // helpers

    function getNextIdx() {
        const gen = () => Math.floor(Math.random()*CHARS.length)

        let idx = gen()
        while (idx === charIdx) {
            idx = gen()
        }

        return idx
    }

</script>

<span style="
    display: inline-block;
    width: 1.5rem;
    text-align: center;
    position: relative;
    {CHARS[charIdx]?.style||""}
">
    {CHARS[charIdx]?.char||"."}
</span>