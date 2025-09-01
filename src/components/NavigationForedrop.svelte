<script lang="ts">
    import { beforeNavigate, afterNavigate } from "$app/navigation";
    import LoadingDots from "./LoadingDots.svelte";
    let navigating = $state(false)
    beforeNavigate(() => navigating = true)
    afterNavigate(() => {
        navigating = false
        document.querySelector('main')?.scrollTo(0,0)
    })
</script>

{#if navigating}
    <div class="navigation-foredrop">
        <LoadingDots />
    </div>
{/if}


<style>
    .navigation-foredrop {
        z-index: 1000000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);

        display: flex;
        justify-content: center;
        align-items: center;

        user-select: none;
    }

    :global(.navigation-foredrop .loading-dots) {
        font-size: 3rem;
    }
</style>