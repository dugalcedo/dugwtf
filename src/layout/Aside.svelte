<script lang="ts">
    import sitemap from "../util/sitemap.svelte.js";
    import SitemapMenu from "./SitemapMenu.svelte";
</script>

<aside>
    <SitemapMenu menu={sitemap} />
</aside>