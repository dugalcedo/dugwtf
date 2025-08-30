import { defineDugwtfRequestHandler } from "../../../lib/server/requestHandling.js"
import dugs from "../../../lib/releases.js"

export const GET = defineDugwtfRequestHandler(() => {
    return {
        message: "Dugscography retrieved.",
        data: dugs
    }
})