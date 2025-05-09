<script lang="ts">
</script>

<header>
    <a class="logo" href="/">
        <img src="/images/moose-stamp.png" alt="moose">
    </a>
    <div class="text">
        <h1>Dug Alcedo</h1>
        <div class="subtitle">
            <p>exprmntl music</p>
            <span>&bull;</span>
            <p>webdev</p>
        </div>
    </div>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 4px;
    }

    .logo {
        padding: 0;
        border: 0;
    }

    .logo img {
        filter: invert(1) brightness(80%) saturate(300%) sepia(1) hue-rotate(100deg);
        width: 100px;
        image-rendering: crisp-edges;
    }

    h1 {
        font-size: 36px;
        text-shadow: 3px 3px 0px var(--semidarkgray);
    }

    .subtitle {
        display: flex;
        justify-content: space-between;
    }
</style>