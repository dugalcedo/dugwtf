export type AtomInteraction = {
    gravity: number
}

export type AtomInit = {
    substrate: Substrate
    colorName: string
    colorValue: string
    x: number
    y: number
    w: number
    h: number
}

export type SubstrateInit = {
    canvas: HTMLCanvasElement
    settings?: SubstrateSettings
}

export class Substrate {

    atomInteractions: Record<string, Record<string, AtomInteraction>> = {}
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    atoms: Atom[] = []
    paused = true

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

        // INIT SETTINGS
        if (!init.settings) return;
        for (const color of init.settings.colors) {
            this.atomInteractions[color.name] = {}
            for (const color2 of init.settings.colors) {
                this.atomInteractions[color.name][color2.name] = {
                    gravity: color.interactions[color2.name].gravity
                }
            }
        }
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

    frame() {
        this.measureForcesAndMoveAll()
        this.draw()
        if (this.paused) return;
        requestAnimationFrame(this.frame.bind(this))
    }

    startLoop() {
        this.paused = false
        requestAnimationFrame(this.frame.bind(this))
    }
}

////////// ATOM

export class Atom {
    substrate: Substrate
    colorName: string
    colorValue: string
    w: number
    h: number
    x: number
    y: number
    vx: number = 0
    vy: number = 0

    constructor(init: AtomInit) {
        this.substrate = init.substrate
        this.colorName = init.colorName
        this.colorValue = init.colorValue
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
        ctx.fillStyle = this.colorValue
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

export type SubstrateSettings = {
    atomCount: number
    colors: Color[]
}

export type Color = {
    name: string
    value: string
    size: number
    prevalence: number
    interactions: Record<string, {
        gravity: number
    }>
}