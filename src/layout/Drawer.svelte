<script lang="ts">
    import layoutStore, { closeDrawer } from "../stores/layoutStore.svelte.js";
    import Icon from "../misc/Icon.svelte";

    type DrawerAnchor = {
        text: string
        type: "anchor"
        href: string
    }

    type DrawerSubmenu = {
        text: string
        type: "submenu"
        items: DrawerItem[]
    }

    type DrawerItem = (
        | DrawerAnchor
        | DrawerSubmenu
    )

    type MenuId = (
        | 'main'
        | 'music'
    )

    const menus: Record<MenuId, DrawerItem[]> = {
        main: [

        ],
        music: [

        ]
    }

    const menuId = $state<MenuId>('main')

</script>

<button 
    class="drawer-backdrop" 
    class:open={layoutStore.backdropIsVisible} 
    aria-label="close drawer"
    onclick={closeDrawer}
></button>

<div class="drawer" class:open={layoutStore.drawerIsOpen}>
    {#each Object.entries(menus) as [id, items] (id)}
        <div class="drawer-items" class:open={menuId === id}>
        
        </div>
    {/each}
</div>

<style>
    .drawer-backdrop {
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);

        /* closed state */
        opacity: 0;
        pointer-events: none;
        transition: .25s;

        /* open state */
        &.open {
            opacity: 1;
            pointer-events: all;
        }
    }

    .drawer {
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 1001;
        top: 0;
        left: 0;

        height: 100dvh;
        width: 50dvw;
        background-color: var(--darkgray);

        /* closed state */
        pointer-events: none;
        transition: 125ms;
        translate: -100% 0;

        &.open {
            translate: 0 0;
            pointer-events: all;
        }
    }

    .drawer-item > * {
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
