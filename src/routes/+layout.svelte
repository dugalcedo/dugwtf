<script lang="ts">
    import '../style/global.css'
    import type { Snippet } from 'svelte';
    
    import Header from '../layout/Header.svelte';
    import Drawer from '../layout/Drawer.svelte';

    const { children }: {
        children: Snippet
    } = $props()

</script>

<Drawer />
<Header />
<main>
    {@render children()}
</main>
<footer></footer>