<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Scorecard } from "../../lib/stores/gameStores/genreGuessr.svelte";
    import { onHoverOrFocus } from "../../lib/util/onHoverOrFocus";
    import { gg, scoreColor } from "../../lib/stores/gameStores/genreGuessr.svelte";

    const {
        name,
        cost,
        scorecard,
        children
    } : {
        name: string
        cost: number
        scorecard: Scorecard
        children: Snippet
    } = $props()

    const score = $derived(scorecard.score())
    const newScore = $derived(score - cost)
    const newScoreMsg = $derived.by(() => {
        if (newScore <= 0) {
            return "you can't afford this"
        } else {
            return `new score will be: ${newScore.toFixed(2)}%`
        }
    })

</script>

<b class="with-cost-tooltip" use:onHoverOrFocus={{
    on() {
        const color = scoreColor(newScore)
        const animationName = color.slice(6, -1)
        gg.costTooltip = {
            name: name,
            msg: newScoreMsg,
            color: color,
            animationName: animationName,
            cost,
            newScore
        }
    },
    off() {
        gg.costTooltip = null
    }
}}>
    {@render children()}
</b>

<style>
    b {
        font-weight: inherit !important;
    }
</style>

