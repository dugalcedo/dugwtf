import { type RequestHandler } from "@sveltejs/kit";

export const fallback: RequestHandler = () => {
    return Response.json({
        error: "Endpoint does not exist"
    }, {
        status: 404
    })
}

