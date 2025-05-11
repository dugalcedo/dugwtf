<script lang="ts">
    import '../style/global.css'
    import '../style/media.css'
    import type { Snippet } from 'svelte';
    
    import Header from '../components/layout/Header.svelte';
    import Aside from '../components/layout/Aside.svelte';
    import Background from '../components/background/Background.svelte';

    const { children }: {
        children: Snippet
    } = $props()

</script>

<Background />
<Header />
<main>
    <Aside />
    <div class="page">
        {@render children()}
    </div>
</main>
<footer></footer>