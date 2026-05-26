<script lang="ts">
    import type { Snippet } from "svelte";

    const p: {
        class?: string
        id?: string
        children: Snippet
        tip: string
        side: 'top' | 'left' | 'bottom' | 'right'
        align: 'start' | 'center' | 'end'
    } = $props()

    const GAP = 8

    const tipStyle = $derived.by((): string => {
        const { side, align } = p
        const parts: string[] = []

        if (side === 'top')         parts.push(`bottom: calc(100% + ${GAP}px)`)
        else if (side === 'bottom') parts.push(`top: calc(100% + ${GAP}px)`)
        else if (side === 'left')   parts.push(`right: calc(100% + ${GAP}px)`)
        else                        parts.push(`left: calc(100% + ${GAP}px)`)

        if (side === 'top' || side === 'bottom') {
            if (align === 'start')     parts.push('left: 0')
            else if (align === 'end')  parts.push('right: 0')
            else                       parts.push('left: 50%', 'transform: translateX(-50%)')
        } else {
            if (align === 'start')     parts.push('top: 0')
            else if (align === 'end')  parts.push('bottom: 0')
            else                       parts.push('top: 50%', 'transform: translateY(-50%)')
        }

        return parts.join('; ')
    })

    const arrowStyle = $derived.by((): string => {
        const { side, align } = p
        const a = `${GAP}px`
        const t = 'transparent'
        const parts: string[] = ['width: 0', 'height: 0']

        if (side === 'top') {
            parts.push(
                `border-left: ${a} solid ${t}`,
                `border-right: ${a} solid ${t}`,
                `border-top: ${a} solid var(--hl)`,
                `bottom: -${GAP}px`
            )
        } else if (side === 'bottom') {
            parts.push(
                `border-left: ${a} solid ${t}`,
                `border-right: ${a} solid ${t}`,
                `border-bottom: ${a} solid var(--hl)`,
                `top: -${GAP}px`
            )
        } else if (side === 'left') {
            parts.push(
                `border-top: ${a} solid ${t}`,
                `border-bottom: ${a} solid ${t}`,
                `border-left: ${a} solid var(--hl)`,
                `right: -${GAP}px`
            )
        } else {
            parts.push(
                `border-top: ${a} solid ${t}`,
                `border-bottom: ${a} solid ${t}`,
                `border-right: ${a} solid var(--hl)`,
                `left: -${GAP}px`
            )
        }

        if (side === 'top' || side === 'bottom') {
            if (align === 'start')    parts.push('left: 8px')
            else if (align === 'end') parts.push('right: 8px')
            else                      parts.push('left: 50%', 'transform: translateX(-50%)')
        } else {
            if (align === 'start')    parts.push('top: 8px')
            else if (align === 'end') parts.push('bottom: 8px')
            else                      parts.push('top: 50%', 'transform: translateY(-50%)')
        }

        return parts.join('; ')
    })
</script>

<div class="tooltip-container {p.class ?? ''}" id={p.id}>
    {@render p.children()}
    <div class="tooltip" style={tipStyle}>
        <div class="arrow" style={arrowStyle}></div>
        {p.tip}
    </div>
</div>

<style>
    .tooltip-container {
        position: relative;
        display: inline-block;
        cursor: help;
    }

    .tooltip {
        background-color: var(--hl);
        color: var(--bg1);
        position: absolute;
        font-size: .8rem;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        z-index: 100;
    }

    .tooltip-container:hover .tooltip {
        opacity: 1;
    }

    .arrow {
        position: absolute;
    }
</style>
