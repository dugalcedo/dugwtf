import type { LayoutLoad } from "./$types.js"
import { forEachSitemapItem } from "../lib/sitemap.svelte.js"

export const prerender = true

export const load: LayoutLoad = ({ url }) => {
    forEachSitemapItem({
        ifLink(link) {
            link.active = link.href === url.pathname
        },
        ifMenu(menu) {
            menu.open = url.pathname.startsWith(menu.path)
        }
    })
}