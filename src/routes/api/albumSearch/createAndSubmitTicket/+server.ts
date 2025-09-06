
import { defineDugwtfRequestHandler } from "../../../../lib/server/requestHandling.js"
import albumSearchQueue, { discogsAlbumSearchFetch } from "../albumSearchQueue.js"

export const GET = defineDugwtfRequestHandler(async (evt) => {
    const { artist, album } = Object.fromEntries(new URL(evt.url).searchParams)

    if (!artist || !album) throw {
        status: 400,
        message: "artist and album searchParams required"
    }

    const { ticket } = albumSearchQueue.createTicket(async () => {
        const res = await discogsAlbumSearchFetch(artist, album)
        if (!res.ok) throw { status: 500, message: "Discogs error" }
        const data = await res.json()
        return data?.results
    })

    const promise = albumSearchQueue.submitTicket(ticket)

    const results = await promise

    return {
        message: "Albums found",
        data: results
    }
})