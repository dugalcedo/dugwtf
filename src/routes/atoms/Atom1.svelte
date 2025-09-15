<script lang="ts">
    import { Substrate, Atom, type AtomInteraction } from "./engine.js";
    import { onDestroy } from "svelte";

    const {
        colors
    } : {
        colors: string[]
    } = $props()

    const SUBSTRATE_WIDTH = 500
    const SUBSTRATE_HEIGHT = SUBSTRATE_WIDTH
    const ATOM_SIZE = 4
    let running = true

    const ranRange = (min: number, max: number) => Math.random()*(max-min) + min;
    const randomColor = () => colors[Math.floor(Math.random()*colors.length)]
    const interactions: Record<string, Record<string, AtomInteraction>> = {}
    for (const colorA of colors) {
        interactions[colorA] = {}
        for (const colorB of colors) {
            interactions[colorA][colorB] = {
                gravity: ranRange(0, 1)
            }
        }
    }

    const handleCanvasLoad = (c: HTMLCanvasElement) => {
        const substrate = new Substrate({
            canvas: c
        })
        substrate.atomInteractions = interactions

        for (let i = 0; i < 500; i++) {
            new Atom({
                x: ranRange(0, SUBSTRATE_WIDTH),
                y: ranRange(0, SUBSTRATE_HEIGHT),
                w: ATOM_SIZE,
                h: ATOM_SIZE,
                colorName: randomColor(),
                substrate
            })
        }

        substrate.draw()

        const frame = () => {
            if (!c || !running) {
                substrate.atoms = []
            };
            substrate.measureForcesAndMoveAll()
            substrate.draw()
            requestAnimationFrame(frame)
        }

        requestAnimationFrame(frame)
    }

    onDestroy(() => {
        running = false
    })
</script>

<div>

    <canvas
        width={SUBSTRATE_WIDTH}
        height={SUBSTRATE_HEIGHT}
        use:handleCanvasLoad
    >
    
    </canvas>
</div>

<style>
    div {
        padding-top: 3rem;
        display: flex;
        justify-content: center;
    }

    canvas {
        image-rendering: pixelated;
    }
</style>