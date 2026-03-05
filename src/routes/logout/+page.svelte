<script lang="ts">
    import { logOut } from "$lib/clientUtils/logOut";
    import { onMount } from "svelte";

    onMount(() => {
        logOut()
    })
</script>

logging out...