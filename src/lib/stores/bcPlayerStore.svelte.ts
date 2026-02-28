import type { Dug } from "$lib/clientData/dugs"

export type BcPlayerStore = {
    dug: Dug | null
    shown: boolean
}

export const bc = $state<BcPlayerStore>({
    dug: null,
    shown: false
})

export const openBcPlayer = (dug: Dug) => {
    bc.dug = dug
    bc.shown = true
}

export const closeBcPlayer = () => {
    bc.shown = false
    bc.dug = null
}

export const showBcPlayer = () => {
    bc.shown = true
}

export const hideBcPlayer = () => {
    bc.shown = false
}
