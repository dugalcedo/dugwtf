<script lang="ts">
    import '../style/global.css'
    import type { Snippet } from 'svelte';
    
    import Header from '../layout/Header.svelte';
    import Aside from '../layout/Aside.svelte';

    const { children }: {
        children: Snippet
    } = $props()

</script>

<Header />
<main>
    <Aside />
    <div class="page">
        {@render children()}
    </div>
</main>
<footer></footer>