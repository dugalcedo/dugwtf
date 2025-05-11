type _SitemapItem = {
    text: string
    type: string
}

type SitemapItem_Link = _SitemapItem & {
    href: string
    type: "link"
    active: boolean
    match?: (pathname: string) => boolean
}

type SitemapItem_Menu = _SitemapItem & {
    items: SitemapItem[]
    type: "menu"
    open: boolean
    path: string
}

export type SitemapItem = (
    | SitemapItem_Link
    | SitemapItem_Menu
)

const sitemap = $state<SitemapItem[]>([
    {
        text: 'home',
        type: 'link',
        active: false,
        href: '/',
    },
    {
        text: 'music',
        type: 'menu',
        path: '/music',
        open: false,
        items: [
            {
                text: "dug's music",
                type: 'link',
                active: false,
                href: '/music'
            },
            {
                text: "dugscography",
                type: 'link',
                active: false,
                href: '/music/dugscography'
            },
            {
                text: "recommendations",
                type: 'link',
                active: false,
                href: '/music/recs'
            },
            {
                text: "favorites",
                type: 'link',
                active: false,
                href: "/music/favs"
            },
            {
                text: "blog",
                type: 'link',
                active: false,
                href: "/music/blog"
            }
        ]
    },
    {
        text: 'webdev',
        type: 'menu',
        path: '/webdev',
        open: false,
        items: [
            {
                text: 'webdev by dug',
                type: 'link',
                active: false,
                href: "/webdev"
            }
        ]
    }
])

export default sitemap

const getAllItemsInMenu = (menu: SitemapItem[]): SitemapItem[] => {
    let items: SitemapItem[] = []
    menu.forEach(item => {
        items.push(item)
        if (item.type === 'menu') {
            items.push(...getAllItemsInMenu(item.items))
        }
    })
    return items
}

export const getAllLinksAndMenus = (): {
    links: SitemapItem_Link[],
    menus: SitemapItem_Menu[]
} => {
    const items = getAllItemsInMenu(sitemap)
    const links: SitemapItem_Link[] = []
    const menus: SitemapItem_Menu[] = []
    items.forEach(item => {
        if (item.type === 'link') {
            links.push(item)
        } else if (item.type === 'menu') {
            menus.push(item)
        }
    })
    return { links, menus }
}

export const forEachSitemapItem = (callbacks: {
    ifLink: (link: SitemapItem_Link) => void,
    ifMenu: (menu: SitemapItem_Menu) => void
}) => {
    getAllItemsInMenu(sitemap).forEach(item => {
        if (item.type === 'link') {
            callbacks.ifLink(item)
        } else if (item.type === 'menu') {
            callbacks.ifMenu(item)
        }
    })
}