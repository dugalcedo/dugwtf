import type { MouseEventHandler } from "svelte/elements"

export const getErrorMessage = async (res: Response): Promise<string> => {
    try { /* Try getting JSON */
        const { message } = await res.json()
        if (!message) throw null;
        return message
    } catch {
        return `Error ${res.status}: ${res.statusText}`
    }
}

export const onClickOutside = <T extends HTMLElement>(node: T, cb: MouseEventHandler<T>) => {
    document.addEventListener('click', (e) => {
        const elementClickedOn = e.target as HTMLElement
        if (elementClickedOn === node) return
        if (node.contains(elementClickedOn)) return
        cb(e as MouseEvent & { currentTarget: T })
    })
}