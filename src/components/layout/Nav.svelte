<script lang="ts">
    const navItems = [
        { href: "/", text: "home" },
        { href: "/dugscography", text: "dugscography" },
        { href: "/recs", text: "recs" },
        { href: "/neo", text: "webdev tools" },
        { href: "/contact", text: "contact" }
    ]
</script>

<nav class="res mobile">
    <button>
        MENU
    </button>
    <div class="menu">
        {#each navItems as item}
            <a href={item.href}>{item.text}</a>
        {/each}
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
            border-bottom: 4px dashed black;
            box-shadow: 0px 4rem 5rem rgba(0, 0, 0, 0.5);
        }

        &:hover > .menu {
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

        @media (min-width: 620px) {
            display: flex;
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