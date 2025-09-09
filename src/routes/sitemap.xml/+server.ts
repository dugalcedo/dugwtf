import dugs from "../../lib/releases.js"
import dayjs from "dayjs"

const base = `https://dug.wtf`
const lastmod = `<lastmod>${dayjs().format('YYYY-MM-DD')}</lastmod>`
type SitemapUrlOptions = {
    priority?: number
    changeFreq?: string
}
const url = (path: string, options?: SitemapUrlOptions) => {
    const xml = `
        <url>
            <loc>${base}${path}</loc>
            <changefreq>${options?.changeFreq || 'weekly'}</changefreq>
            <priority>${options?.priority || 0.5}</priority>
            ${lastmod}
        </url>
    `

    return xml
}

const urls = [
    url('', { priority: 1 }),
    url('/dugscography', { priority: 0.9 }),
    url('/musicilove'),
    url('/neo'),
    url('/collage'),
    url('/collage/search'),
    url('/collage/lastfm'),
    url('/contact')
]

urls.push(...dugs.map(dug => url(`/dug/${dug.id}`)))

const urlsString = urls.join('\n')

export const GET = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlsString}
        </urlset>
    `

    console.log(xml)

    return new Response(xml, {
        headers: {
            'Content-Type': 'text/xml'
        }
    })
}