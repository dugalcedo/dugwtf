export default function chillBg() {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    const SIZE = 2

    let pt = 0
    let d = 0
    let fps = 0

    Array.prototype.random = function() {
        return this[Math.round(Math.random()*(this.length-1))]
    }

    Math.py = function(a, b) {
        return Math.sqrt(a*a + b*b)
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

        move() {
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
            "yellow"
        ]

        static all = []
    }

    main()

    function main() {
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        createParticles(200, 'rgba(255,255,255,0.3)')
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
            p.move()
            p.render()
        })

        requestAnimationFrame(frame)
    }

    function clear() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }

    requestAnimationFrame(frame)
}

export function resetBg() {
    
    let ctx = document.querySelector('canvas').getContext('2d')
    ctx.clearRect(0,0,canvas.width,canvas.height)
}