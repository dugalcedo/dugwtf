<script lang="ts">
    import { onMount } from "svelte";

    let cell = $state<null | HTMLTableCellElement>(null)
    let text = $state("COPY")

    const handleFailure = (consoleMsg: string, uiMsg = "FAILED TO COPY") => {
        console.warn(`CLCIT FAILURE: ${consoleMsg}`)
        showLilMessage(uiMsg)
    }

    const handler = () => {
        if (!cell) return handleFailure("CURRENT cell not found");
        const previousCell = cell.previousSibling
        if (!previousCell) return handleFailure("PREVIOUS cell not found")
        if (!(previousCell instanceof HTMLElement)) return handleFailure("PREVIOUS cell not HTMLElement")
        const text = previousCell.innerText
        window.navigator.clipboard.writeText(text)
        showLilMessage("COPIED :)")
    }

    // ---- helper ----
    function showLilMessage(msg: string) {
        text = msg
        setTimeout(() => {
            text = "COPY"
        }, 2000);
    }
</script>

<td bind:this={cell}>
    <button onclick={handler} disabled={text !== "COPY"}>
        {text}
    </button>
</td>