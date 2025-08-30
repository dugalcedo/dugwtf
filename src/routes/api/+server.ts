import { defineDugwtfRequestHandler } from "../../lib/server/requestHandling.js"

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