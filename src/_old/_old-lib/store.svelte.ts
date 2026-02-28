import type { NeodugUser_FE } from "./types.js"
import { getErrorMessage } from "./index.js"

type Store = {
    user: null | NeodugUser_FE
    userLoadingState: string
}

export const store = $state<Store>({
    user: null,
    userLoadingState: "idle"
})

export const authenticate = async () => {

    if (store.user) {
        store.userLoadingState = "logged in"
        return
    };

    store.userLoadingState = "loading"

    const res = await fetch("/api/neodug/user")
    
    if (!res.ok) {
        const data = await res.json()
        console.log(data)
        store.userLoadingState = data.message
        store.user = data.data
        return
    }

    const data = await res.json()
    store.user = data
    store.userLoadingState = 'logged in'
}

export const logOut = () => {
    document.cookie = "neodugtoken=;"
    store.userLoadingState = 'logged out'
}