<nav id="MAIN_NAV" class="normal">
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="/">HOME</a>
    <a href="/contact">CONTACT</a>
    <a href="/games">GAMES</a>
</nav>

<nav id="MAIN_NAV" class="smallscreen">

</nav>

<style>
    nav {
        display: flex;

        & > * {
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