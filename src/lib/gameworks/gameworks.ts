import { v7 } from "uuid"

// ========== TYPES ==========

type ID = string;
type Detail = Record<string, any>;
type DrawFn = (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
type KeyEventName = "keyup" | "keydown" | "keypress"
type KeyAssignment = { key: string, fn: (e: KeyboardEvent) => void, name?: KeyEventName, ctrl?: boolean, shift?: boolean }

type Gameworks<S extends Detail> = {
    div: HTMLDivElement
    width: number
    height: number
    state: S
    fps: number
    looping: boolean
    createCanvas: <CS extends Detail>(init: GWCanvasInit<CS>) => GWCanvas<CS>
    assignKey: (assignment: KeyAssignment) => void
    start: () => void
    pause: () => void
    stop: () => void
}

type GameworksInit<S extends Detail> = {
    div: HTMLDivElement
    width: number
    height: number
    state: S
}

type GWCanvas<S extends Detail> = {
    id: ID
    z: number
    state: S
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    hasChangedObject: boolean
    createObject: <OS extends Detail>(init: GWObjectInit<OS>) => GWObject<OS>
    drawObject: <OS extends Detail>(obj: GWObject<OS>) => void
    deleteObject: (object: GWObject<Detail>) => void
    drawAllObjects: () => void
    markAsChanged: () => void
}

type GWCanvasInit<S extends Detail> = {
    z?: number
    state: S
}

type GWObject<S extends Detail> = {
    id: ID
    z: number
    state: S
    draw: DrawFn
}

type GWObjectInit<S extends Detail> = {
    z?: number
    state: S
    draw: DrawFn
}

// ========== FACTORY ==========

export function createGameworks<S extends Detail>(init: GameworksInit<S>): Gameworks<S> {
    
    const _div = init.div
    const _height = init.height
    const _width = init.width
    const _state = init.state
    
    _div.style.width = `${_width}px`
    _div.style.height = `${_height}px`

    const _canvases: Record<ID, GWCanvas<Detail>> = {}

    let _playing = false
    let _looping = false
    let _previousTime = -1
    let _delta = -1
    let _fps = -1

    const _drawAllCanvases = () => {
        for (const id in _canvases) {
            const canvas = _canvases[id]
            canvas.drawAllObjects()
        }
    }

    const _loopEngine = (() => {
        const __loop = (time: DOMHighResTimeStamp) => {
            _delta = time - _previousTime
            _previousTime = time
            _fps = _delta/1000;
            _drawAllCanvases()

            if (!_looping || !_playing) return;

            requestAnimationFrame(__loop)
        }

        const _start = () => {
            _looping = true
            _playing = true
            _previousTime = performance.now()
            requestAnimationFrame(__loop)
        }

        const _pause = () => {
            _looping = false
        }

        const _stop = () => {
            _playing = false
            _looping = false
        }

        return {
            _start,
            _pause,
            _stop
        }
    })();

    const createCanvas = <CS extends Detail>(init: GWCanvasInit<CS>): GWCanvas<CS> => {
        const c = _createCanvas(init)
        c.canvas.width = _width
        c.canvas.height = _height
        c.canvas.style.zIndex = c.z.toString()
        _div.append(c.canvas)
        _canvases[c.id] = c
        return c
    }

    const assignKey = (assignment: KeyAssignment) => {
        const key = assignment.key.toLowerCase()
        const name = assignment.name ?? "keypress"

        const callback = (e: KeyboardEvent) => {
            if (key !== e.key.toLowerCase()) return;
            if (assignment.ctrl && !e.ctrlKey) return;
            if (assignment.shift && !e.shiftKey) return;
            if (!assignment.ctrl && e.ctrlKey) return;
            if (!assignment.shift && e.shiftKey) return;
            if (!_playing) return;
            assignment.fn(e)
        }

        document.addEventListener(name, callback)

        // cleanup
        return () => {
            document.removeEventListener(name, callback)
        }
    }

    return {
        get div() { return _div },
        get width() { return _width },
        get height() { return _height },
        get state() { return _state },
        get fps() { return _fps },
        get looping() { return _looping },
        createCanvas,
        assignKey,
        start: _loopEngine._start,
        pause: _loopEngine._pause,
        stop: _loopEngine._stop,
    }
}

function _createCanvas<S extends Detail>(init: GWCanvasInit<S>): GWCanvas<S> {

    const _id = v7()
    const _z = init.z ?? 0;
    const _state = init.state;

    const _canvas = document.createElement('canvas')
    const _ctx = _canvas.getContext('2d')!

    const _objectZLayers: (Record<ID, GWObject<Detail>>)[] = []

    let _hasChangedObject = false

    const createObject = <OS extends Detail>(init: GWObjectInit<OS>): GWObject<OS> => {
        const obj = _createObject(init)
        const _z = init.z??0

        if (!_objectZLayers[_z]) _objectZLayers[_z] = {}
        _objectZLayers[_z][obj.id] = obj

        return obj
    }

    const deleteObject = (object: GWObject<Detail>) => {
        delete _objectZLayers[object.z]?.[object.id]
    }

    const drawObject = <OS extends Detail>(obj: GWObject<OS>) => {
        obj.draw(_canvas, _ctx)
    }

    const clear = () => {
        _ctx.clearRect(0, 0, _canvas.width, _canvas.height)
    }

    const drawAllObjects = (clearFirst = true) => {
        if (!_hasChangedObject) return;
        if (clearFirst) clear();
        for (const layer of _objectZLayers) {
            for (const id in layer) {
                const obj = layer[id]
                drawObject(obj)
            }
        }
        _hasChangedObject = false;
    }

    const markAsChanged = () => {
        _hasChangedObject = true
    }

    return {
        get id() { return _id},
        get z() { return _z },
        get state() { return _state },
        get canvas() { return _canvas },
        get ctx() { return _ctx },
        get hasChangedObject() { return _hasChangedObject },
        createObject,
        drawObject,
        deleteObject,
        drawAllObjects,
        markAsChanged
    }
}

function _createObject<S extends Detail>(init: GWObjectInit<S>): GWObject<S> {
    const _id = v7()
    const _z = init.z ?? 0;
    const _state = init.state;
    const _draw = init.draw

    return {
        get id() { return _id},
        get z() { return _z },
        get state() { return _state },
        get draw() { return _draw }
    }
}
