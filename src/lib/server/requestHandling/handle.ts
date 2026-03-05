import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { getPostgresDb } from "../db/connect";
import type { ZodError, ZodObject } from "zod";
import { z } from 'zod'
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres";
const { PostgresError } = postgres;
type PostgresError = InstanceType<typeof PostgresError>;
import { DEV } from "$env/static/private";
import { preventAttacks } from "./preventAttacks";
import type { DbUser } from "../db/schemas/user";
import { signToken } from "../serverUtils/jwt";

// DRH = DUGWTF REQUEST HANDLER

type DRH_Context<S extends ZodObject> = RequestEvent & {
    db: PostgresJsDatabase
    body: z.infer<S>
    validateFound: (item: any, msg: string) => void 
    keepLoggedIn: (user: DbUser) => string
    signToken: (user: DbUser) => string
};

type DRH_Result = {
    status?: number
    data?: any
    msg?: string
}

type DRH_Handler<S extends ZodObject> = (drhCtx: DRH_Context<S>) => DRH_Result | Promise<DRH_Result>;

type DRH_Error = {
    type: string
    serverLog: string
    clientMsg: string
    status: number
    serverData: Json
    clientData: Json
}

type DRH_Options<S extends ZodObject> = {
    parseBody?: boolean
    zodSchema?: S
    customResponse?: Response
}

type DRH_Init<S extends ZodObject> = DRH_Options<S> & {
    handler: DRH_Handler<S>
}

// ===== END OF TYPES =====

export const drhHandle = <S extends ZodObject>(init: DRH_Init<S>): RequestHandler => {
    return async (ctx) => {
        // LOG HEAD
        console.log(`${new Date().toString()} NEW REQUEST [${ctx.request.method} ${ctx.request.url}]`)

        try {
            // PREVENT ATTACKS
            preventAttacks(ctx)

            // PARSE BODY
            const skipParsingBody = init.parseBody === false;
            const body = skipParsingBody ? null : (await parseBody(ctx));
            console.log({skipParsingBody, body})

            // VALIDATE BODY
            if (init.zodSchema) {
                validateBody(body, init.zodSchema)
            }

            // GET RESULT
            const result = await init.handler({
                ...ctx,
                body,
                // DATABASE GETTER
                get db() {
                    const db = getPostgresDb()
                    if (!db) throw {
                        status: 503,
                        type: "database",
                        clientMsg: "database down",
                        serverLog: "database down"
                    }
                    return db
                },
                validateFound,
                keepLoggedIn(user) {
                    const token = signToken({ id: user.id, hash: user.hash })
                    ctx.cookies.set(
                        "dugwtf-token", 
                        token, 
                        {
                            path: "/",
                            httpOnly: true,
                            maxAge: 30 * 24 * 60 * 60
                        }
                    )
                    return token
                },
                signToken(user) {
                    return signToken({ id: user.id, hash: user.hash })
                }
            })

            // CUSTOM RESPONSE
            if (init.customResponse) return init.customResponse;

            // GOOD RESPONSE
            return Response.json({
                msg: result.msg || "success?",
                data: result.data,
            }, {
                status: result.status || 200
            })

        } catch (err) {
            if (DEV === 'true') console.log(err);

            // PARSE ERROR
            const error = parseDrhError(err)

            // LOG
            console.log(`- error: ${error.serverLog}`)

            // BAD RESPOND
            return Response.json({
                msg: error.clientMsg,
                data: error.clientData
            }, {
                status: error.status
            })
        }
    }
}

// ===== HELPERS ======

const parseDrhError = (err: unknown): DRH_Error => {
    const inner = (err as any)?.cause ?? err;
    if (inner instanceof PostgresError) {
        return parsePostgresError(inner)
    }

    const any: any = err || {};

    return {
        type: any.type || "unknown",
        serverLog: any.serverLog || any.message || "log not provided",
        clientMsg: any.clientMsg || "internal server error",
        status: any.status || 500,
        serverData: any.serverData || any || null,
        clientData: any.clientData || null
    }
}

const parsePostgresError = (err: PostgresError): DRH_Error => {
    const base = {
        type: "postgres",
        serverLog: err.message,
        serverData: err,
        clientData: null,
        status: 500,
        clientMsg: "database error"
    }

    switch (err.code) {
        case "23505": {
            // Extract field name from detail, e.g. 'Key ("displayName")=(dug) already exists.'
            const field = err.detail?.match(/Key \("?([^")]+)"?\)/)?.[1]
            const clientMsg = field ? `${field} already taken` : "duplicate value"
            return { ...base, status: 409, clientMsg }
        }
        case "23503":
            return { ...base, status: 400, clientMsg: "referenced record does not exist" }
        case "23502":
            return { ...base, status: 400, clientMsg: "missing required field" }
        case "23514":
            return { ...base, status: 400, clientMsg: "value failed validation" }
        default:
            return base
    }
}
 
const parseBody = async (ctx: RequestEvent): Promise<Json | null> => {
    try {
        const body: Json = await ctx.request.json()
        return body
    } catch (err) {
        console.log("did not parse body:", err)
        return null
    }
}

const validateFound = (item: any, msg: string) => {
    if (!item) throw {
        status: 404,
        type: 'not found',
        serverLog: msg,
        clientMsg: msg
    }
}

const validateBody = (body: any, schema: ZodObject) => {
    try {
        schema.parse(body)
    } catch (err) {
        const zodErr = err as ZodError
        const clientMsg = zodErr.issues?.map(e => e.message).join(", ") || "invalid input"
        throw {
            status: 400,
            serverLog: "invalid input",
            clientMsg,
            type: "zod",
            serverData: body,
            clientData: tryToGetTreeifiedError(err)
        }
    }
}

const tryToGetTreeifiedError = (err: unknown) => {
    try {
        return z.treeifyError(err as ZodError)
    } catch {
        return {
            errors: ['invalid input'],
            properties: {}
        }
    }
}