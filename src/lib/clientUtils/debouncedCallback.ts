export const debouncedCallback = (cb: () => any, ms = 500) => {
    let timeout: any = 0

    const call = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb()
        }, ms)
    }

    return () => {
        call()
    }
}