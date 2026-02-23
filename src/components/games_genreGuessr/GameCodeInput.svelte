<script>
    import { startGameFromCode } from "../../lib/stores/gameStores/genreGuessr.svelte";
    let value = $state("")

    const handler = async () => {
        startGameFromCode(value)
    }
</script>

<input 
    type="text" 
    bind:value={value}
    onkeypress={e => {
        if (e.key == 'Enter') handler();
    }}
>

<button onclick={handler}>
    enter code
</button>