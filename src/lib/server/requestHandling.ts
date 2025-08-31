import { type RequestHandler, type RequestEvent } from "@sveltejs/kit"
import { NeodugUser, parseNeodugUserToken, useNeodugDb, type NeodugUserType } from "./neodugDb.js"
import { CORS_HEADERS } from "./cors.js"

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
            await useNeodugDb()
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
    let status = error.status || 500
    let statusText = error.statusText || error.message || "Unknown error"
    let message = error.message || "Something went wrong"

    if (error._message?.includes('validation')) {
        message = getMongooseErrorMessage(error as any)
    } 

    return Response.json({
        message,
        error: true,
        data: error.data
    }, {
        status,
        statusText,
        headers: CORS_HEADERS
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
        statusText,
        headers: CORS_HEADERS
    })
}

export const cookieOptions = {
    httpOnly: false,
    maxAge: 60*60*24*30,
    path: "/"
}

export const getUserFromEvt = async (evt: SvelteKitEvent): Promise<NeodugUserType> => {
    const token = (
        evt.cookies.get('neodugtoken') 
        || evt.request.headers.get('x-neodugtoken')  
    );

    if (!token) throw {
        status: 400,
        message: "Missing token"
    }

    const user_id = parseNeodugUserToken(token)
    const foundUser = await NeodugUser.findById(user_id)
        .populate({
            path: 'commentboxes',
            populate: {
                path: 'comments'
            }
        })

    if (!foundUser) throw {
        status: 400,
        message: "Token doesn't match an existing user. Maybe your username changed?"
    }

    return foundUser
}

export const getMongooseErrorMessage = (error: {
    errors: Record<string, {
        message: string
    }>
}): string => {
    let message = "Invalid input"
    if (typeof error.errors === 'object') {
        message += ". "
        message += Object.values(error.errors).map(x => x.message).join(', ')
    }
    return message
}