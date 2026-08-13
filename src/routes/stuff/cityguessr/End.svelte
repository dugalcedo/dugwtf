<script lang="ts">
    import EndGameAnswers from "./EndGameAnswers.svelte";
    import { cgState } from "./cgState.svelte";

</script>

<p>
    you got {cgState.correctGuesses} of {cgState.cities.length} correct
</p>

<br>

<button onclick={() => cgState.status = 'not-started'}>RESET</button>
<br>

<EndGameAnswers />