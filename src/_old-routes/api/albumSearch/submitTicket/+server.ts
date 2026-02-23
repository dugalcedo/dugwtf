import { defineDugwtfRequestHandler } from "../../../../_old-lib/server/requestHandling.js"
import albumSearchQueue from "../albumSearchQueue.js"

export const GET = defineDugwtfRequestHandler(async (evt) => {
    const ticket = new URL(evt.request.url).searchParams.get('ticket')
    if (!ticket) throw { status: 400, message: `Missing ticket in URL search params.` }

    const results = await albumSearchQueue.submitTicket(ticket)

    return {
        message: `Albums found`,
        data: results
    }
})