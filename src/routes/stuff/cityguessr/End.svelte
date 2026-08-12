<script lang="ts">
    import Answers from "./Answers.svelte";
    import { cgState } from "./cgState.svelte";

</script>


<button onclick={() => cgState.status = 'not-started'}>RESET</button>

<Answers />
