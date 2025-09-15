export type AtomInteraction = {
    gravity: number
}

export type AtomInit = {
    substrate: Substrate
    colorName: string
    x: number
    y: number
    w: number
    h: number
}

export type SubstrateInit = {
    canvas: HTMLCanvasElement
}

export class Substrate {

    atomInteractions: Record<string, Record<string, AtomInteraction>> = {}
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    atoms: Atom[] = []

    defineInteraction(colorName1: string, colorName2: string, interaction: AtomInteraction) {
        // parent
        if (!this.atomInteractions[colorName1]) this.atomInteractions[colorName1] = {};
        const parent = this.atomInteractions[colorName1];

        // child
        if (!parent[colorName2]) {
            parent[colorName2] = interaction
        } else {
            console.warn(`Interaction already defined: ${colorName1}/${colorName2}`)
        }
    }

    constructor(init: SubstrateInit) {
        this.canvas = init.canvas
        this.ctx = this.canvas.getContext('2d')!
    }

    draw() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'rgba(17, 17, 17, 0.5)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        for (const atom of this.atoms) {
            atom.draw()
        }
    }

    measureForcesAndMoveAll() {
        for (const atom of this.atoms) {
            atom.measureForces()
        }

        for (const atom of this.atoms) {
            atom.move()
        }
    }
}

////////// ATOM

export class Atom {
    substrate: Substrate
    colorName: string
    w: number
    h: number
    x: number
    y: number
    vx: number = 0
    vy: number = 0

    constructor(init: AtomInit) {
        this.substrate = init.substrate
        this.colorName = init.colorName
        this.x = init.x
        this.y = init.y
        this.w = init.w
        this.h = init.h
        this.substrate.atoms.push(this)
    }

    draw() {
        const ctx = this.substrate.ctx;
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.colorName
        ctx.fill()
    }

    measureForces() {
        this.vx = 0
        this.vy = 0
        for (const target of this.substrate.atoms) {
            if (target === this) continue;
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const d = Math.sqrt(dx**2 + dy**2)
            const g = this.substrate.atomInteractions[this.colorName][target.colorName].gravity || 0;
            const f = 1 / d * g
            this.vx += dx * f
            this.vy += dy * f
        }
    }

    move() {
        this.x += this.vx
        this.y += this.vy
 
        // confine X
        if (this.x < 0) {
            this.x = 0
        } else if ((this.x+this.w) > this.substrate.canvas.width) {
            this.x = this.substrate.canvas.width - this.w
        }

        // confine Y
        if (this.y < 0) {
            this.y = 0
        } else if ((this.y+this.h) > this.substrate.canvas.height) {
            this.y = this.substrate.canvas.height - this.y
        }

        this.vx = 0
        this.vy = 0
    }
}