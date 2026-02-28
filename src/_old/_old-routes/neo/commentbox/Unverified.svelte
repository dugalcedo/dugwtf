<script lang="ts">
    import { getErrorMessage } from "../../../_old-lib/index.js";
    import { onMount } from "svelte";

    const {
        user,
        ev
    }: {
        user: NeodugUser_FE
        ev: NeodugEmailVerification_FE | undefined
    } = $props()

    let msSinceLastEmail = $state((() => {
        if (!ev) return Infinity;
        if (!ev.lastEmail) return Infinity;
        const date = new Date(ev.lastEmail);
        const now = new Date();
        console.log({ev, date, now})
        return now.getTime() - date.getTime();
    })());

    const fifteenMinutes = 1000*60*15;
    let canSend = $derived(msSinceLastEmail > fifteenMinutes)

    let { m, s } = $derived.by(() => {
        const diff = fifteenMinutes - msSinceLastEmail
        const m = Math.floor(diff/1000/60)
        const s = Math.round((diff/1000)-(m*60))
        return { m, s }
    })

    let sendEmailLoading = $state(false)
    let sendEmailError = $state("")

    const handleSendEmail = async () => {
        sendEmailError = ""
        sendEmailLoading = true

        const url = "/api/neodug/email"
        const options = { method: "POST" }
        const res = await fetch(url, options)

        if (!res.ok) {
            sendEmailError = await getErrorMessage(res)
            sendEmailLoading = false
            return
        }

        window.location.reload()

        sendEmailLoading = false
    }

    onMount(() => {
        setInterval(() => {
            msSinceLastEmail += 1000
        }, 1000);
    })

</script>

<div class="panel">
    <p>Your email address is <strong>unverified</strong>.</p>
    <button disabled={!canSend || sendEmailLoading} onclick={handleSendEmail}>
        Resend verification email
    </button>
    <span class="error">{sendEmailError}</span>
    {#if !canSend}
        <p>
            You sent a verification email too recently. You can try again in {m} minutes and {s} seconds.
        </p>
    {/if}
</div>