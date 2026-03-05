<script lang="ts">
    import { getErrorMessage } from "$lib/clientUtils/getErrorMessage";

    let fetching = $state(false)
    let error = $state("")
    let success = $state(false)

    const handleClick = async () => {
        fetching = true

        const res = await fetch("/api/db/user/resendCode")
        
        if (!res.ok) {
            const msg = await getErrorMessage(res)
            error = msg
            fetching = false
            return
        }

        success = true
        fetching = false
    }
</script>

{#if fetching}
    <p class="warning">wait...</p>
{:else if error}
    <p class="error">ERROR: {error}</p>
{:else if success}
    <p>email sent</p>
{:else}
    <button onclick={handleClick}>
        RESEND VERIFICATION CODE
    </button>
{/if}