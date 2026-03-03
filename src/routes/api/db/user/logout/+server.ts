import { drhHandle } from "$lib/server/requestHandling/handle";

export const GET = drhHandle({
    async handler({ cookies }) {
        cookies.set("dugwtf-token", "", {
            path: "/",
            httpOnly: true,
            maxAge: 1
        })

        return {
            msg: "logged out"
        }
    },
})