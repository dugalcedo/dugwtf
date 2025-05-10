<script lang="ts">
    import sitemap from "../lib/sitemap.svelte.js";
    import SitemapMenu from "./SitemapMenu.svelte";
</script>

<aside>
    <div class="sitemap-menu">
        <SitemapMenu menu={sitemap} />
    </div>
</aside>

<style>
    .sitemap-menu {
        position: sticky;
        top: 0;
    }
</style>