<script lang="ts">
    const {
        score
    } : {
        score: number 
    } = $props()

    const backgroundColor = $derived.by(() => {
        if (score >= 70) return 'var(--hl)';
        if (score > 30) return 'var(--warning)';
        return 'var(--error)';
    })

    const danger = $derived(score <= 30)

</script>

<strong style="
    background-color: {backgroundColor};
    animation-name: {danger ? "score-chip-danger": ""};
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
">
    {score}%
</strong>

<style>
    strong {
        display: inline-block;
        padding: 0 .5rem;
        color: var(--bg);
        transform: scale(1);
    }

    
</style>