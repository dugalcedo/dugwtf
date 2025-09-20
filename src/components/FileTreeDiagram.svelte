<script lang="ts">
    import FileTreeDiagram from './FileTreeDiagram.svelte'
    interface TreeItem { name: string, children?: TreeItem[], note?: string, forceFolderIcon?: boolean }
    const { tree }: { tree: TreeItem[] } = $props()
</script>

{#each tree as item}
{@const isFolder = (item.forceFolderIcon || item.children) !== undefined}
    <div class="tree-item">
        <div class="name">
            <div class="left">
                <span class="icon">
                    <img src="/icons/{isFolder?'folder':'file'}.svg">
                </span>
                <p>{item.name}</p>
            </div>
            {#if item.note}
                <p class="note">{item.note}</p>
            {/if}
        </div>
        {#if item.children}
            <FileTreeDiagram tree={item.children} />
        {/if}
    </div>
{/each}

<style>
    .tree-item {
        font-size: .8rem;
        padding: .5rem;
        margin-left: 1.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        background-color: rgba(255, 255, 255, 0.05);
        border-left: 1px dashed rgba(255, 255, 255, 0.5);
    }

    .name {
        display: flex;
        justify-content: space-between;
    }

    .left {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    .icon img {
        width: 15px;
    }
</style>