import { defineDugwtfRequestHandler } from "../../../lib/server/requestHandling.js"

export const GET = defineDugwtfRequestHandler(() => {
    throw {
        status: 404,
        message: "Not found"
    }
})