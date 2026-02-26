export const clickOutside = (el: HTMLElement, callback: (e: MouseEvent | KeyboardEvent) => void) => {
    document.addEventListener('click', e => {
        if (e.target === el) return;
        if (el.contains(e.target as any)) return;
        callback(e)
    })

    document.addEventListener('keypress', e => {
        if (e.target === el) return;
        if (el.contains(e.target as any)) return;
        callback(e)
    })
}