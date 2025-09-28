<script lang="ts">
    import type { Snippet } from "svelte";
    import type { BlogLayoutData } from "../../lib/types.js";
    const { children, data }: { children: Snippet, data: BlogLayoutData } = $props()
    
    const extractTitleAndDate = (str: string) => {
        return [
            str.slice(str.indexOf('_')+1),
            str.slice(0, str.indexOf('_'))
        ]
    }

    let page = $state(1)
    let perPage = $state(5)
    let sort = $state('desc')

    const displayedLabels = $derived.by(() => {
        const start = (page-1) * perPage;
        const end = page * perPage;
        return data.labels
            .map(str => extractTitleAndDate(str))
            .toSorted((a, b) => {
                const [_titleA, dateStrA] = a
                const [_titleB, dateStrB] = b
                const dateA = new Date(dateStrA).getTime()
                const dateB = new Date(dateStrB).getTime()
                return sort === 'desc' ? dateB - dateA : dateA - dateB
            })
            .slice(start, end)
    })

</script>


<div class="res">
    
    <nav>
        {#each displayedLabels as [title, date]}
            <a href="/blog/{date}_{title}" class="blog-label">
                <span class="title">{title}</span>
                <span class="date">{date}</span>
            </a>
        {/each}
    </nav>

    {@render children()}
</div>

<style>
    nav {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 5px;
        background-color: rgba(255, 255, 255, 0.02);
    }

    .blog-label {
        outline: 1px solid aquamarine;
        padding: 3px;
        font-size: .6rem;
        text-decoration: none;
        display: inline-flex;
        flex-direction: column;

        &:hover {
            background-color: aquamarine;
            color: black;
        }
    }
</style>