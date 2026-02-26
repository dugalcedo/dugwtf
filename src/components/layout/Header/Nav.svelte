<script>
    import { clickOutside } from "../../../lib/util/clickOutside";
    let smallMenuOpen = $state(false)
</script>

<nav id="MAIN_NAV" class="normal">
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="/">HOME</a>
    <a href="/music">MUSIC</a>
    <a href="/games">GAMES</a>
    <a href="/contact">CONTACT</a>
</nav>

<nav id="MAIN_NAV" class="smallscreen" use:clickOutside={() => smallMenuOpen = false}>
    <button 
        style="
            padding: .25rem;
        " 
        onclick={() => smallMenuOpen = !smallMenuOpen}
        class:inactive={!smallMenuOpen}
    >
        <p style="
            writing-mode: sideways-rl;
            font-size: 1.3rem;
        ">MENU</p>
    </button>
    <div class="menu" style="
        display: {smallMenuOpen ? 'flex' : 'none'};
    ">
        <a onclick={() => smallMenuOpen = false} href="/">HOME</a>
        <a onclick={() => smallMenuOpen = false} href="/music">MUSIC</a>
        <a onclick={() => smallMenuOpen = false} href="/games">GAMES</a>
        <a onclick={() => smallMenuOpen = false} href="/contact">CONTACT</a>
    </div>
</nav>

<style>
    nav {
        display: flex;

        & > a {
            display: inline-block;
            padding: .666rem 1.23rem;
            background-color: var(--bg2);
            cursor: pointer;

            &:hover {
                background-color: var(--bg3);
                color: var(--comp);
            }
        }
    }

    .smallscreen {
        display: none;

        position: relative;
        align-self: stretch;

        & .menu {
            animation: funny-hl-outline 1s linear infinite;
            background-color: var(--hl);
            position: absolute;
            z-index: var(--z-nav-menu);
            top: 100%;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            & > a {
                color: var(--bg) !important;
                padding: .5rem;
                font-size: 1.5rem;
            }
        }
    }

    .inactive {
        filter: grayscale(1);
    }

    @media (width < 650px) {
        .normal {
            display: none !important;
        }

        .smallscreen {
            display: flex;
        }
    }
</style>