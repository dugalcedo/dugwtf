import { type Dug } from "../_old-lib/releases.js"

type Bcplayer = {
    dug: null |  Dug
    isOpen: boolean
}

export const bcplayer = $state<Bcplayer>({
    dug: null,
    isOpen: true
})