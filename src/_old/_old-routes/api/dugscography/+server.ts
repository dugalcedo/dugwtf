import { defineDugwtfRequestHandler } from "../../../_old-lib/server/requestHandling.js"
import dugs from "../../../_old-lib/releases.js"
import { createCorsOptionsHandler } from "../../../_old-lib/server/cors.js"

export const OPTIONS = createCorsOptionsHandler()

export const GET = defineDugwtfRequestHandler(() => {
    return {
        message: "Dugscography retrieved.",
        data: dugs
    }
})