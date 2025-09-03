<script lang="ts">
    import { onClickOutside } from "../../lib/index.js";

    const navItems = [
        { href: "/", text: "home" },
        { href: "/dugscography", text: "dugscography" },
        { href: "/musicilove", text: "music i love" },
        { href: "/neo", text: "webdev tools" },
        { href: "/contact", text: "contact" }
    ]

    let mobileMenuShown = $state(false)
</script>

<nav class="res mobile" class:menu-shown={mobileMenuShown} use:onClickOutside={() => mobileMenuShown = false}>
    <button onclick={() => mobileMenuShown = !mobileMenuShown}>
        MENU
    </button>
    <div class="menu">
        {#each navItems as item}
            <a href={item.href} onclick={() => mobileMenuShown = false}>
                {item.text}
            </a>
        {/each}
        <button class="close-btn" onclick={() => mobileMenuShown = false}>&times;</button>
    </div>
</nav>

<nav class="res desktop-flex">
    {#each navItems as item}
        <a href={item.href}>{item.text}</a>
    {/each}
</nav>

<style>
    nav.mobile {
        position: relative;

        @media (min-width: 620px) {
            display: none;
        }

        & > button {
            width: 100%;
            margin: 0;
        }

        & > .menu {
            display: none;
            position: absolute;
            background-color: white;
            width: calc(100% - 16px);
            z-index: 500;
            box-shadow: 0px 4rem 5rem rgba(0, 0, 0, 0.5);
        }

        & .close-btn {
            color: black;
            font-size: 3rem;
            padding: 0 0 .5rem 0;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &.menu-shown > .menu {
            display: flex;
            flex-direction: column;
        }

        & a {
            color: black;
            text-decoration: none;
            text-align: center;
            padding: 1rem 0;

            &:hover {
                background-color: aquamarine;
            }
        }
    }

    nav.desktop-flex {
        padding-bottom: 1px;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: .8rem;

        @media (min-width: 620px) {
            display: flex;
        }

        @media (min-width: 800px) {
            font-size: 1rem;
        }

        & a {
            display: block;
            padding: .3rem 1rem;
            color: white;
            text-decoration: none;

            &:hover {
                background-color: aquamarine;
                color: black;
            }
        }
    }
</style>