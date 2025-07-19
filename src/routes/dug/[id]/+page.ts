import dugs, { type Dug } from '../../../lib/releases.js'

export const load = async ({ params }) => {
    const i = dugs.findIndex(dug => dug.id == params.id)
    const dug: Dug | undefined = dugs[i]
    const next: string | undefined = dugs[i-1]?.id
    const prev: string | undefined = dugs[i+1]?.id

    return {
        id: params.id,
        dug,
        prev,
        next
    }
}

