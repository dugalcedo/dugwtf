const isDev = () => window.location.href.includes("localhost:5173");

export const backendUrl = () => {
    return ""
}

export type BackendFetchResult<Data> = {
    res: Response | null
    success?: {
        data: Data
    }
    error: {
        type: "fetch" | "bad-res" | "bad-json" | "none"
        message: string
        data: any
    }
}

export const backendFetch = async <Data>(...args: Parameters<typeof fetch>): Promise<BackendFetchResult<Data>> => {

    // ----- 1. Response
    const url = backendUrl() + args[0].toString();
    let res: Response
    try {
        res = await fetch(url, args[1])
    } catch (error) {
        console.error(`Failed to fetch at '${url}'`, error)
        return {
            res: null,
            error: {
                type: "fetch",
                message: (error as any)?.message || "failed to request data",
                data: {}
            }
        }
    }

    if (!res.ok) {
        return {
            res,
            error: {
                type: 'bad-res',
                message: res.statusText || "failed to request data",
                data: {}
            }
        }
    }

    // ----- 2. Data
    let text = await res.text()
    let data: Data
    try {
        data = JSON.parse(text)
    } catch {
        console.error(`Failed to read JSON at '${url}'`, text)
        return {
            res,
            error: {
                type: 'bad-json',
                message: text,
                data: {}
            }
        }
    }

    // Success
    return {
        res,
        success: {
            data
        },
        error: {
            type: "none",
            message: "",
            data: {}
        }
    }
}