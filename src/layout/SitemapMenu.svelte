<script lang="ts">
    import type { SitemapItem } from "../lib/sitemap.svelte.js";
    import Self from './SitemapMenu.svelte'

    const {
        menu,
        padding = 0,
        headingSize = 1.3,
        linkSize = 1
    } : {
        menu: SitemapItem[],
        padding?: number,
        headingSize?: number,
        linkSize?: number
    } = $props()

</script>

<ul style="padding-left: {padding}rem;">
    {#each menu as item}
        <li 
            class:active={item.type === 'link' && item.active}
            class="{item.type}"
        >
            {#if item.type === 'link'}
                <a href={item.href} class:active={item.active} style="font-size: {linkSize}rem;">
                    {item.text}
                </a>
            {:else if item.type === 'menu'}
                <h4 style="font-size: {headingSize}rem;">
                    <button class="non" onclick={() => item.open = !item.open}>
                        {item.text}
                    </button>
                </h4>
                {#if item.open}
                    <Self 
                        menu={item.items} 
                        padding={padding+1} 
                        headingSize={headingSize-0.15}
                        linkSize={linkSize-0.15}
                    />
                {/if}
            {/if}
        </li>
    {/each}
</ul>

<style>
    li {
        list-style-type: none;
    }

    li button {
        padding: .5rem;
        font-size: 1.25rem;
    }

    li.active {
        &::marker {
            content: "\25B7";
        }
    }

    li a {
        display: inline-block;
        padding: .5rem;
    }
</style>

