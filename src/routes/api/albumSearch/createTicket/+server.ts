import { defineDugwtfRequestHandler } from "../../../../lib/server/requestHandling.js"
import albumSearchQueue, {discogsAlbumSearchFetch} from "../albumSearchQueue.js"

export const GET = defineDugwtfRequestHandler(async (evt) => {
    const { artist, album } = Object.fromEntries(new URL(evt.url).searchParams)

    if (!artist && !album) throw {
        status: 400,
        message: "artist or album searchParams required"
    }
    const { ticket, estimatedWaitTime } = albumSearchQueue.createTicket(async () => {
        const res = await discogsAlbumSearchFetch(artist, album)
        if (!res.ok) throw { status: 500, message: "Discogs error" }
        const data = await res.json()
        return data?.results
    })

    return {
        message: `albumSearch ticket created`,
        data: {
            ticket,
            estimatedWaitTime
        }
    }
})