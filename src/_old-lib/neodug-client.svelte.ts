import type { NeodugUser_FE } from "./types.js"

type NeodugClientLoadState = (
    | 'idle'
    | 'loading'
    | 'loggedin'
    | 'loggedout'
    | 'error'
)

type NeodugClient = {
    user: NeodugUser_FE | null
    email: string | null
    loadState: {
        type: NeodugClientLoadState
        error?: boolean
        data?: any
    }
}

const neodugClient: NeodugClient = $state({
    user: null,
    email: null,
    loadState: {
        type: 'idle'
    }
})

export default neodugClient

/////

export const updateLoadStateType = (type: NeodugClientLoadState) => {
    neodugClient.loadState = { ...neodugClient.loadState, type }
}

export const setUser = (u: NeodugUser_FE) => {
    neodugClient.user = u
    updateLoadStateType('loggedin')
}

export const logOut = () => {
    document.cookie = "neodugtoken=;"
    neodugClient.user = null
    updateLoadStateType('loggedout')
}

export const authorize = async () => {
    if (neodugClient.user) {
        console.warn("authorize was called but there was already neodugClient.user")
        updateLoadStateType('loggedin')
        return
    }

    const res = await fetch("/api/neodug/user")
    const text = await res.text()
    let data: any;

    try {
        data = await JSON.parse(text)
    } catch (error) {
        console.error(error)
        neodugClient.loadState = {
            type: 'error',
            error: true,
            data: { message: "Something went wrong" }
        }
        return
    }

    if (!res.ok) {
        neodugClient.loadState = {
            type: 'error',
            error: true,
            data: { message: data.message || "Something went wrong", email: data.email || "[EMAIL UNKNOWN]" }
        }
        return
    }

    neodugClient.loadState = {
        type: 'loggedin',
        data: data
    }

    neodugClient.user = data
}