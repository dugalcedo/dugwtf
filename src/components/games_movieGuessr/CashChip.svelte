<script lang="ts">
    import { deriveColorVarFromMoneyAmount } from "$lib/stores/gameStores/movieGuessr.svelte";

    const {
        cash
    }: {
        cash: number
    } = $props()

    const colorVar = $derived(deriveColorVarFromMoneyAmount(cash))

</script>

<span class="cash-chip" style="
    background-color: var(--{colorVar});
    color: var(--bg);
    font-size: 1.3rem;
    font-weight: bold;
    width: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    animation: funny-{colorVar}-outline 1s linear infinite;
">
    €{cash}
</span>