import dotenv from 'dotenv'; dotenv.config()
import Queue from "../../../lib/queue.js"

export default Queue.create('albumSearch', 2000)

export const DISCOGS_API_ROOT = `https://api.discogs.com`
export const DISCOGS_USER_AGENT = 'DugWtfCollageMaker/0.0.1 +https://dug.wtf/collage'

export const discogsFetch = (path: string, params: Record<string, string>) => {

    if (!process.env.DISCOGS_CONSUMER_KEY || !process.env.DISCOGS_CONSUMER_SECRET) throw new Error("Missing discogs env vars");

    const url = new URL(`${DISCOGS_API_ROOT}${path}`)

    Object.entries(params).forEach(([k,v]) => {
        url.searchParams.set(k, v)
    })

    url.searchParams.set('key', process.env.DISCOGS_CONSUMER_KEY)
    url.searchParams.set('secret', process.env.DISCOGS_CONSUMER_SECRET)

    const promise = fetch(url, {
        headers: {
            'User-Agent': DISCOGS_USER_AGENT
        }
    })

    return promise
}

export const discogsAlbumSearchFetch = (artist: string, release_title: string) => {
    return discogsFetch('/database/search', { artist, release_title })
}