export type OnCallback<T extends HTMLElement> = (e: MouseEvent | FocusEvent, node: T) => void;
export type OffCallback<T extends HTMLElement> = (e: MouseEvent | FocusEvent, node: T) => void;

export const onHoverOrFocus = <T extends HTMLElement>(node: T, callbacks: { on: OnCallback<T>, off: OffCallback<T> }) => {
    node.addEventListener('mouseenter', e => {
        callbacks.on(e, node)
    })

    node.addEventListener('mouseleave', e => {
        callbacks.off(e, node)
    })

    node.addEventListener('focus', e => {
        callbacks.on(e, node)
    })

    node.addEventListener('blur', e => {
        callbacks.on(e, node)
    })
}