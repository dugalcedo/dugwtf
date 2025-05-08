const layoutStore = $state({
    backdropIsVisible: false,
    drawerIsOpen: false
})

export const openDrawer = () => {
    layoutStore.backdropIsVisible = true
    layoutStore.drawerIsOpen = true
}

export const closeDrawer = () => {
    layoutStore.drawerIsOpen = false
    layoutStore.backdropIsVisible = false
}

export default layoutStore