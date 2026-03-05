<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import ResendButton from "./ResendButton.svelte";
    import { onMount, onDestroy } from "svelte";

    const WAIT = 30*60;
    
    const getSecSince = () => {
        if (!page.data.user || !page.data.user.lastVerificationCodeSentAt) return 0;
        const msSince = Date.now() - page.data.user.lastVerificationCodeSentAt.getTime();
        return Math.round(msSince/1000)
    }

    let secSince = $state(getSecSince())
    let mustWait = $derived(secSince < WAIT)
    let timeRemaining = $derived.by(() => {
        const secsRemaining = WAIT - secSince;
        if (secsRemaining <= 120) return `${secsRemaining} seconds`;
        return `${Math.round(secsRemaining/60)} minutes`
    })
    let interval: any = 0;

    const countDown = () => {
        secSince++
        if (secSince >= WAIT) {
            clearInterval(interval)
        }
    }

    onMount(() => {
        interval = setInterval(countDown, 1000)
        if (page.data.user?.verified) {
            setTimeout(() => {
                goto("/")
            }, 3000)
        }
    })
    onDestroy(() => {
        clearInterval(interval)
    })


</script>

{#if !page.data.user}
    <p>log in first</p>
{:else if !page.data.user.verified}
    <p>a verification code has already been sent to your email address.</p>
    <p>didn't get it?</p>
    <br>
    {#if mustWait}
        <p class="warning">wait {timeRemaining} to send a new one.</p>
    {:else}
        <ResendButton />
    {/if}
{:else}
    <p>your account has been verified. redirecting...</p>
{/if}