import "./router.js"

window.currentDate = new Date()

window.addEventListener('dugsLoaded', ()=>{
    let annis = []
    dugs.listed.forEach(dug => {
        let diff = currentDate-dug.date.released.date
        let years = diff/1000/60/60/24/365
        let age = Math.round(years)
        let prox = age - years
        let fyllerAr = Math.abs(prox) < 0.017
        if (fyllerAr) {
            annis.push([dug, age])
        }
    })
    if (annis.length) {
        let message = `the following album${annis.length>1?'s have anniversaries':' has an anniversary'}:`
        annis.forEach(([dug, age]) => {
            message += `<div class="anni">
                            <span>${dug.TITLE}</span>
                            <span>${age} year${age>1?'s':''}</span>
                            <span>${dug.date.released.display}</span>
                        </div>`
        })
        openModal({
            heading: 'album anniversaries',
            message
        })
    }
})

// -----------------------------   BACKGROUND STUFF


const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const SIZE = 2
const q = 75
const s = 1/2

let pt = 0
let d = 0
let fps = 0

let driftX
let driftY

let chill = true

const rules = {
    ww: -.029,
    cc: -.038,
    yy: -.051,
    mm: -.045,

    cm: -.090,
    cw: -.200,
    cy: -.600,

    my: -.100,
    mw: -.300,

    wy: -.088,
}

Array.prototype.random = function() {
    return this[Math.round(Math.random()*(this.length-1))]
}

Math.py = function(a, b) {
    return Math.sqrt(a*a + b*b)
}

Math.randrange = function(a, b) {
    return (Math.random()*(b-a)) + a
}

class Particle {
    constructor(x={}) {
        this.x = x.x || Math.random()
        this.y = x.y || Math.random()
        this.c = x.c || Particle.colors.random()

        this.i = Particle.all.length

        Particle.all.push(this)
    }

    get distances() {
        return Particle.all.map(p => {
            let a = this.x-p.x
            let b = this.y-p.y
            let c = Math.py(a, b)
            return {a, b, c}
        })
    }

    calcVel() {
        this.vel = [0,0]
        this.distances.forEach((d, i) => {
            if (i == this.i) return
            let prox = 1 - Math.abs(d.c)
            let pullX = d.a/(Math.abs(d.a)+Math.abs(d.b))
            let pullY = d.b/(Math.abs(d.a)+Math.abs(d.b))
            let rulepair = ([this.c[0], Particle.all[i].c[0]].sort((a,b)=>a.localeCompare(b)).join(""))
            let p = rules[rulepair]
            
            this.vel[0] += prox*pullX*p
            this.vel[1] += prox*pullY*p
        })
        this.vel[0] /= Particle.all.length
        this.vel[1] /= Particle.all.length
    }

    get stepFactor() {
        return d/16.67*s
    }

    move() {
        this.x += this.vel[0]*this.stepFactor + Math.randrange(-0.0003, 0.0003) + driftX
        this.y += this.vel[1]*this.stepFactor + Math.randrange(-0.0003, 0.0003) + driftY
        if (this.x < 0 || this.x > 1) {
            // this.x = 0
            this.x = this.x*-1
        }
        if (this.y < 0 || this.y > 1) {
            // this.y = 0
            this.y = this.y*-1
        }
        
    }

    oldMove() {
        let vel = [0,0]
        this.distances.forEach((d, i) => {
            if (i == this.i) return
            let prox = 1 - Math.abs(d.c)
            let pullX = d.a/(Math.abs(d.a)+Math.abs(d.b))
            let pullY = d.b/(Math.abs(d.a)+Math.abs(d.b))
            vel[0] += prox*pullX
            vel[1] += prox*pullY
        })
        vel[0] /= Particle.all.length
        vel[1] /= Particle.all.length
        this.x += vel[0]
        this.y += vel[1]
    }

    render() {
        ctx.beginPath()
        ctx.rect(
            canvas.width*this.x,
            canvas.height*this.y,
            SIZE,
            SIZE
        )
        ctx.fillStyle = this.c
        ctx.fill()
    }

    static colors = [
        "cyan",
        "magenta",
        "yellow",
        'white'
    ]

    static all = []
}

function livingBg() {
    chill = false
    resetBg()
    function randomizeDrift() {
        driftX = Math.randrange(.0015, -.0015)
        driftY = Math.randrange(.0015, -.0015)
    }

    main()

    function main() {
        resizeCanvas()

        randomizeRules()
        randomizeDrift()

        createParticles('magenta')
        createParticles('yellow')
        createParticles('cyan')
        createParticles('white')

        setInterval(restart, 5000)
    }

    function restart() {
        Particle.all = []
        randomizeRules()
        randomizeDrift()
        createParticles('magenta')
        createParticles('yellow')
        createParticles('cyan')
        createParticles('white')
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth-50
        canvas.height = window.innerHeight-50
    }

    function createParticles(c) {
        for (let i = 0; i < Math.randrange(q+q/3, q-q/3); i ++) {
            new Particle({c})
        }
    }

    function frame(t) {
        d = t - pt
        fps = 1000/d
        pt = t

        clear()

        Particle.all.forEach(p => {
            p.calcVel()
        })

        Particle.all.forEach(p => {
            p.move()
            p.render()
        })

        requestAnimationFrame(frame)
    }

    function clear() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }

    requestAnimationFrame(frame)


    function randomizeRules() {
        Object.entries(rules).forEach(([k,v]) => {
            rules[k] = Math.randrange(-.2, .2)
        })
    }
}


function chillBg() {
    chill = true
    resetBg()
    main()

    function main() {
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        createParticles(200, 'white')
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    function createParticles(n, c) {
        for (let i = 0; i < n; i ++) {
            new Particle({c})
        }
    }

    function frame(t) {
        d = t - pt
        fps = 1000/d
        pt = t

        clear()

        Particle.all.forEach(p => {
            if (chill) {
                p.oldMove()
            } else {
                p.calcVel()
                p.move()
            }
            p.render()
        })

        requestAnimationFrame(frame)
    }

    function clear() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }

    requestAnimationFrame(frame)
}

function resetBg() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    Particle.all = []
}

chillBg()


window.addEventListener('toggleBg', () => {
    if (chill) {
        livingBg()
    } else chillBg()
}) 