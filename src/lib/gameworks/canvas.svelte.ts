import { v7 } from "uuid";

export type Obj = Record<string, any>

export type CanvasManagerInit<MS extends Obj> = {
    state: MS
}

export class CanvasManager<MS extends Obj> {

    state: MS

    constructor(init: CanvasManagerInit<MS>) {
        this.state = $state(init.state)
    }
}