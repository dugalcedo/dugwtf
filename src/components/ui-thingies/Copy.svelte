<script lang="ts">
    const {
        text,
        buttonText = "COPY"
    }: {
        text: string
        buttonText?: string
    } = $props()
</script>

<button onclick={() => {
    window.navigator.clipboard.writeText(text)
}}>
    {buttonText}
</button>