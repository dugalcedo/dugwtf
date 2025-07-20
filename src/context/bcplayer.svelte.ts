import type { Dug } from "../lib/releases.js"

type BcPlayer = {
    dug: Dug | null
}

const bcplayer: BcPlayer = $state({
    dug: null
})

export default bcplayer