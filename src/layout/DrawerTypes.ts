export type DrawerAnchor = {
    text: string
    type: "anchor"
    href: string
}

export type DrawerSubmenu = {
    text: string
    type: "submenu"
    id: MenuId
}

export type DrawerBack = {
    type: "back"
}

export type DrawerItem = (
    | DrawerAnchor
    | DrawerSubmenu
    | DrawerBack
)

export type MenuId = (
    | 'none'
    | 'main'
    | 'music'
    | 'webdev'
)