import { createCorsOptionsHandler } from "../../lib/server/cors.js"
import { defineDugwtfRequestHandler } from "../../lib/server/requestHandling.js"

export const OPTIONS = createCorsOptionsHandler()

export const GET = defineDugwtfRequestHandler(() => {
    return {
        message: "Welcome to the dug.wtf api.",
        data: {
            endpoints: {
                GET: {
                    "/api": {
                        description: "Returns a welcome message and descriptions of available endpoints."
                    },
                    "/api/dugscography": {
                        description: "Returns Dug's discography."
                    }
                }
            }
        }
    }
})