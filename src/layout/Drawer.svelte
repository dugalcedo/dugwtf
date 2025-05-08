<script lang="ts">
    import type { MenuId, DrawerItem as DrawerItemT } from "./DrawerTypes.js";
    import layoutStore, { closeDrawer } from "../stores/layoutStore.svelte.js";
    import DrawerItem from "./DrawerItem.svelte";

    const menus: Record<MenuId, DrawerItemT[]> = {
        main: [
            {
                type: 'anchor',
                text: 'home',
                href: '/'
            },
            {
                type: 'submenu',
                text: 'music',
                id: 'music'
            },
            {
                type: 'submenu',
                text: 'webdev',
                id: 'webdev'
            }
        ],
        music: [
            {
                type: 'back'
            },
            {
                type: 'anchor',
                text: 'dugscography',
                href: '/dugscography'
            }
        ],
        webdev: [
            {
                type: 'back'
            },
            {
                type: 'anchor',
                text: 'pong',
                href: '/webdev/pong'
            }
        ],
        none: []
    }

    let menuId = $state<MenuId>('main')

    const changeMenu = (id: MenuId) => {
        menuId = 'none'
        setTimeout(() => {
            menuId = id
        }, 200);
    }

    const close = () => {
        closeDrawer()
        changeMenu('main')
    }

</script>

<button 
    class="drawer-backdrop" 
    class:open={layoutStore.backdropIsVisible} 
    aria-label="close drawer"
    onclick={close}
></button>

<div class="drawer" class:open={layoutStore.drawerIsOpen}>
    {#each Object.entries(menus) as [id, items] (id)}
        <div class="drawer-items" class:open={menuId === id}>

            <!-- Drawer items -->
            {#each items as item}
                <DrawerItem {item} {changeMenu} {close} />
            {/each}

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
        min-width: 100px;
        max-width: 75dvw;

        overflow-x: hidden;
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

    .drawer-items {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow-x: hidden;

        /* closed state */
        translate: -100% 0;
        pointer-events: none;
        transition: 125ms;

        &.open {
            pointer-events: all;
            translate: 0 0;
        }
    }
</style>
