<script lang="ts">
    import { onMount } from "svelte";
    onMount(() => {
        let flag = "/homeserver/"
        let href = window.location.href;
        let i = href.indexOf(flag) + flag.length
        window.location.href = `https://vivien-ruinous-efferently.ngrok-free.dev/${href.slice(i)}`
    })
</script>