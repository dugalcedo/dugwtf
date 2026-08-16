export type GameFrameHandler = () => void

export type GameInit<GS extends Detail> = {
    frameHandler: GameFrameHandler
    initialState: GS
}

export type KeyControlTrigger = (
    | 'keyup'
    | 'keydown'
    | 'keypress'
    | 'hold'
)

export type KeyControlOpts = {
    holdDelay?: number
    ctrl?: boolean
    shift?: boolean
}

export type HeldKey = {
    fn: () => void
    startedAt: number
    delay: number
    delayFulfilled: boolean
}

export type Detail = Record<string, any>

export class Game<GS extends Detail> {

    paused = true
    stopped = true
    previousTime = -1
    delta = -1
    fps = -1
    frameHandler: GameFrameHandler
    state: GS

    heldKeys: Record<string, HeldKey> /* number is ms started in case of delay */ = {}

    constructor(init: GameInit<GS>) {
        this.frameHandler = init.frameHandler
        this.state = $state(init.initialState)
    }

    start(andUnpause?: boolean) {
        this.stopped = false
        if (andUnpause) this.paused = false
        this.previousTime = performance.now()
        requestAnimationFrame(this.#loop.bind(this))
    }

    stop() {
        this.stopped = true
        this.paused = true
    }
    
    #loop(time: DOMHighResTimeStamp) {
        this.delta = time - this.previousTime
        this.previousTime = time
        this.fps = 1000/this.delta

        this.#handleHeldKeys()
        this.frameHandler()

        // stopping
        if (this.stopped) {
            this.previousTime = -1
            this.delta = -1
            this.fps = -1
            return
        }

        requestAnimationFrame(this.#loop.bind(this))
    }

    assignControl(trigger: KeyControlTrigger, key: string, fn: (e: KeyboardEvent) => void, opts?: KeyControlOpts) {
        if (opts?.shift) key = key.toUpperCase();

        if (trigger === 'hold') {
            return this.#assignHeldControl(key, fn, opts)
        }

        const callback = (e: KeyboardEvent) => {
            if (!Game.keyIsPressed(key, e, opts)) return;
            fn(e)
        }

        document.addEventListener(trigger, callback)

        // unassignment function
        return () => {
            document.removeEventListener(trigger, callback)
        }
    }

    #assignHeldControl(key: string, fn: (e: KeyboardEvent) => void, opts?: KeyControlOpts) {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!Game.keyIsPressed(key, e, opts)) return;
            const heldKey: HeldKey = {
                fn: () => fn(e),
                startedAt: performance.now(),
                delay: opts?.holdDelay ?? 0,
                get delayFulfilled() {
                    const now = performance.now()
                    return (now - heldKey.startedAt) >= heldKey.delay
                }
            }
            this.heldKeys[key] = heldKey
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!Game.keyIsPressed(key, e, opts)) return;
            delete this.heldKeys[key]
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        // unassignment function
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }

    #handleHeldKeys() {
        for (const key in this.heldKeys) {
            const hk = this.heldKeys[key]
            if (hk.delayFulfilled) hk.fn()
        }
    }

    // STATIC

    static keyIsPressed(key: string, e: KeyboardEvent, opts?: KeyControlOpts) {
        if (e.key !== key) return false;
        if (opts?.ctrl && !e.ctrlKey) return false;
        if (opts?.shift && !e.shiftKey) return false;
        if ((opts?.ctrl===false) && e.ctrlKey) return false;
        if ((opts?.shift===false) && e.shiftKey) return false;
        return true;
    }

}