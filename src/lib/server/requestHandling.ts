import { type RequestHandler, type RequestEvent } from "@sveltejs/kit"

export type DugwtfResponse = {
    custom?: Response
    status?: number
    statusText?: string
    message?: string
    data?: any
}

export type SvelteKitEvent =  RequestEvent<Partial<Record<string, string>>, string | null>
export type DugwtfRequestHandler = (evt: RequestEvent) => DugwtfResponse | Promise<DugwtfResponse>;


export const defineDugwtfRequestHandler = (handler: DugwtfRequestHandler): RequestHandler => {
    return async (evt) => {
        try {
            const res = await handler(evt)
            if (res.custom) return res.custom;
            return convertDugwtfResponseToJavascriptResponse(res)
        } catch (error) {
            console.log(error)
            return convertErrorToJavascriptResponse(error || {})
        }
    }
}

// Helpers

export const convertErrorToJavascriptResponse = (error: Record<string, any>): Response => {
    const status = error.status || 500
    const statusText = error.statusText || error.message || "Unknown error"
    const message = error.message || "Something went wrong"

    return Response.json({
        message,
        error: true,
        data: error.data
    }, {
        status,
        statusText
    })
}

export const convertDugwtfResponseToJavascriptResponse = (res: DugwtfResponse): Response => {
    const status = res.status || 200
    const statusText = res.statusText || res.message || "Success"
    const message = res.message || "Success"
    
    return Response.json({
        message,
        error: false,
        data: res.data
    }, {
        status,
        statusText
    })
}

export const cookieOptions = {
    httpOnly: false,
    maxAge: 60*60*24*30,
    path: "/"
}