<script lang="ts">
    import { onMount } from "svelte";

    const {
        text,
        variant = "fg"
    } : {
        text: string
        variant?: "fg" | "bg"
    } = $props()

    // svelte-ignore state_referenced_locally
    let chars = $state(text.split("").map((char, i) => {
        return {
            char,
            n: iToN(i)
        }
    }))

    onMount(() => {
        setInterval(() => {
            shiftNs()
        }, 250);
    })
    
    // ---- helpers ----
    function iToN(i: number): number {
        const index = Math.floor(Math.abs(i))
        const m = index % 8;
        return m <= 4 ? m : 8 - m;
    }
    function shiftNs() {
        const newChars = [...chars]
        for (let i = 0; i < newChars.length; i++) {
            newChars[i].n = (newChars[i+1] || newChars[0]).n
        }
        chars = newChars
    }
</script>

<span class="blorby">
    {#each chars as { char, n }}
        <span style="
            color: var(--{variant}{n});
        ">
            {char}
        </span>
    {/each}
</span>