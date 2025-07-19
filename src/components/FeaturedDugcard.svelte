<script lang="ts">
    import dugs from "../lib/releases.js";
    const {
        title,
        bgLeft = 0,
        bgTop = 0,
        bgFilter = "grayscale(1) contrast(2)"
    } : {
        title: string
        bgLeft?: number
        bgTop?: number
        bgFilter?: string
    } = $props()

    const dug = dugs.find(d => d.title === title)!
</script>

<a class="featured-dug-card" href="/dug/{dug.id}">
    <img 
        src="{dug.cover_l}" 
        alt="album cover of {dug.title} by {dug.artist}" class="bg"
        style="
            z-index: 1;
            position: absolute;
            top: 0%;
            left: 0%;
            transform: translate(
                {bgLeft}%,
                {bgTop}%
            );
            width: 100%;
            filter: {bgFilter};
            mix-blend-mode: lighten;
        "
    >
    <h2 class="black bg-white">{dug.title}</h2>
    {#if !['Dug Alcedo', 'First Dog'].includes(dug.artist)}
        <p class="black bg-white artist">by {dug.artist}</p>
    {/if}
    {#if dug.desc}
        <p class="black bg-white desc">{dug.desc}</p>
    {/if}
    <p class="black bg-white desc">{dug.year}</p>
</a>

<style>
    .featured-dug-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;

        aspect-ratio: 2/1;
        position: relative;
        overflow: hidden;
        margin-bottom: 1rem;
        color: var(--white);
        text-decoration: none;
    }

    :global(.featured-dug-card > *) {
        display: inline-block;
        position: relative;
        z-index: 2;

    }
    
    :global(.featured-dug-card:hover > *) {
        background-color: var(--black) !important;
        color: var(--white) !important;
    }

    .featured-dug-card:hover .bg {
        animation-name: bg-animation;
        animation-duration: 0.1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes bg-animation {
        0% {
            filter: grayscale(1) contrast(2);
        }

        50% {
            filter: grayscale(0) contrast(1);
        }

        100% {
            filter: grayscale(1) contrast(2);
        }
    }

    .desc {
        max-width: 300px;
    }
</style>