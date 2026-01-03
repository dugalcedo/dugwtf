<script>
    import NeodugAuthAsync from "../../components/NeodugAuthAsync.svelte";
    import { store, authenticate, logOut } from "../../lib/store.svelte.js";
    import { onMount } from "svelte";

    onMount(() => {
        authenticate()
    })
</script>

<div class="res">
    let's hang out

    {#if store.userLoadingState === 'idle'}
        <p>IDLE</p>
    {:else if store.userLoadingState === 'loading'}
        <p>LOADING</p>
    {:else if store.userLoadingState === 'logged in'}
        <p>LOGGED IN!</p>
        <button onclick={logOut}>
            log out
        </button>
    {:else if store.userLoadingState === 'unverified'}
        <p>Verify your email address by clicking the link sent to {store.user?.email || "[EMAIL NOT FOUND]"}</p>
    {:else}
        <NeodugAuthAsync />
    {/if}
</div>