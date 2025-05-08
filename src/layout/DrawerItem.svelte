<script lang="ts">
    import Icon from "../misc/Icon.svelte";
    import type { DrawerItem, MenuId } from "./DrawerTypes.js";

    const {
        item,
        changeMenu,
        close
    } : {
        item: DrawerItem
        changeMenu: (item: MenuId) => void
        close: any
    } = $props()

</script>

<div class="drawer-item">
    {#if item.type === 'anchor'}
        <a href="{item.href}" onclick={close} onkeyup={close} role='button' tabindex="-1">{item.text}</a>
    {:else if item.type === 'submenu'}
        <button onclick={() => changeMenu(item.id as MenuId)}>
            {item.text}
            <Icon name="right" />
        </button>
    {:else if item.type === 'back'}
        <button onclick={() => changeMenu('main')}>
            <Icon name="right" style="transform: rotate(180deg);" />
            back
        </button>
    {/if}
</div>

<style>
    .drawer-item > * {
        width: 100%;
        font-size: 12px;
        padding: 10px 5px;
        background: none;
        border: 0;
        border-radius: 0;

        color: var(--white);
    }

    .drawer-item > button {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>