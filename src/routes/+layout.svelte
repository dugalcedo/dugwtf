<script lang="ts">
    import '../style/global.css'
    import Header from '../layout/Header.svelte';
    import type { Snippet } from 'svelte';

    const { children }: {
        children: Snippet
    } = $props()

</script>

<Header />
<main>
    {@render children()}
</main>
<footer></footer>