<script lang="ts">
    import { logOut } from "$lib/util/logOut";
    import { onMount } from "svelte";

    onMount(() => {
        logOut()
    })
</script>

logging out...