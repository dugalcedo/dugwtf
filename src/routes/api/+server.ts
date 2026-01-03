import { createCorsOptionsHandler } from "../../lib/server/cors.js"
import { defineDugwtfRequestHandler, getIP } from "../../lib/server/requestHandling.js"
import validator from "validator"

export const OPTIONS = createCorsOptionsHandler()

export const GET = defineDugwtfRequestHandler((evt) => {
    const ip = getIP(evt)

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
            },
            testStuff: {
                yourIp: ip,
                yourIpIsIp: (ip !== '::1') && validator.isIP(ip||"")
            }
        }
    }
})