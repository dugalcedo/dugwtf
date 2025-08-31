<script lang="ts">
    import { onMount } from "svelte";
    import { getErrorMessage } from "../../../../lib/index.js";
    const { data }: { data: any } = $props()

    console.log(data)

    let loading = $state(true)
    let error = $state("")

    async function verify() {
        if (!data.params.evid) {
            loading = false
            error = "Missing id in URL."
        }

        const url = `/api/neodug/email`
        const options = {
            method: "PUT",
            body: JSON.stringify({
                evid: data.params.evid
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            error = await getErrorMessage(res)
            loading = false
            return
        }

        window.location.href = "/neo"
    }

    onMount(verify)

</script>

<div class="res">
    {#if loading}
        <p>Verifying email address...</p>
    {/if}
    {#if error}
        <p>ERROR: {error}</p>
    {/if}
</div>