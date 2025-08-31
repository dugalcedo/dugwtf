import { defineDugwtfRequestHandler } from "../../../lib/server/requestHandling.js"
import dugs from "../../../lib/releases.js"
import { createCorsOptionsHandler } from "../../../lib/server/cors.js"

export const OPTIONS = createCorsOptionsHandler()

export const GET = defineDugwtfRequestHandler(() => {
    return {
        message: "Dugscography retrieved.",
        data: dugs
    }
})