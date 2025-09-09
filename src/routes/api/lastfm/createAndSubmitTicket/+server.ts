import { defineDugwtfRequestHandler } from "../../../../lib/server/requestHandling.js"
import { getParams, getUsersTopAlbums, lastfmQueue } from "../lastfmQueue.js"

export const GET = defineDugwtfRequestHandler(async (evt) => {
    const { username, period, limit } = getParams(evt)

    const { ticket } = lastfmQueue.createTicket(async () => {
        const data = await getUsersTopAlbums(username, period, limit)
        return data
    })

    const data = await lastfmQueue.submitTicket(ticket)

    return {
        data
    }
})