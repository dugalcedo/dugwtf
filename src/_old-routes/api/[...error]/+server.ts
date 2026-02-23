import { createCorsOptionsHandler } from "../../../_old-lib/server/cors.js"
import { defineDugwtfRequestHandler } from "../../../_old-lib/server/requestHandling.js"

export const OPTIONS = createCorsOptionsHandler()

export const GET = defineDugwtfRequestHandler(() => {
    throw {
        status: 404,
        message: "Not found"
    }
})