<script lang="ts">
    import { Substrate, Atom, type AtomInteraction, type SubstrateSettings } from "./engine.js";
    import { onDestroy } from "svelte";

    const {
        settings
    } : {
        settings: SubstrateSettings
    } = $props()

    let substrate = $state<null | Substrate>(null)
    let substrateWidth = $state(500)
    let substrateHeight = $state(500)
    let atomSize = $state(4)

    const ranRange = (min: number, max: number) => Math.random()*(max-min) + min;
    const randomColor = () => settings.colors[Math.floor(Math.random() * settings.colors.length)].name


    const handleCanvasLoad = (c: HTMLCanvasElement) => {
        substrate = new Substrate({
            canvas: c,
            settings
        })

        for (const color of settings.colors) {
            for (let i = 0; i < settings.atomCount*color.prevalence; i++) {
                new Atom({
                    x: ranRange(0, substrateWidth),
                    y: ranRange(0, substrateHeight),
                    w: color.size,
                    h: color.size,
                    colorName: color.name,
                    colorValue: color.value,
                    substrate
                })
            }
        }

        substrate.startLoop()
    }

    onDestroy(() => {
        if (substrate) substrate.paused = true;
    })
</script>

<div>

    <canvas
        width={substrateWidth}
        height={substrateHeight}
        use:handleCanvasLoad
    >
    
    </canvas>
</div>

<style>
    canvas {
        /* width: 100%; */
        /* image-rendering: pixelated; */
    }

    div {
        display: flex;
        justify-content: center;
    }

    canvas {
        image-rendering: pixelated;
    }
</style>