<script>
    import { page } from "$app/state";
    import { clickOutside } from "../../../lib/clientUtils/clickOutside";
    let smallMenuOpen = $state(false)

    const pageLoggedIn = $derived(page.data.user !== undefined)

    const navItems = [
        {
            href: "/",
            text: "HOME"
        },
        {
            href: "/music",
            text: "MUSIC"
        },
        {
            href: "/games",
            text: "GAMES"
        },
        {
            href: "/contact",
            text: "CONTACT"
        }
    ]
</script>

<nav id="MAIN_NAV" class="normal">
    {#each navItems as { href, text }}
        <a href={href}>{text}</a>
    {/each}
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
        {#each navItems as { href, text }}
            <a onclick={() => smallMenuOpen = false} href={href}>{text}</a>
        {/each}
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