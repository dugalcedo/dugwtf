<script>
    import { makeMoreReadable } from "../lib/clientUtils/makeMoreReadable";

    const age = (() => {
        const now = new Date()
        const born = new Date('1992-06-03')
        return Math.floor((now.getTime()-born.getTime())/1000/60/60/24/365.25)
    })();

</script>

<svelte:head>
    <title>Dug Alcedo - electronic music</title>
</svelte:head>


<section id="HOME_PAGE">
    <div class="float"><img src="/images/moose_suburb.png" alt="anthropomorphic cartoon moose"></div>
    <p use:makeMoreReadable>
        i'm dug the moose. i make music and websites. i'm a {age} year old neurodivergent gay guy from california, living in sweden. i currently work as a web development tutor. if you'd like help learning web development, feel free to <a href="/contact">contact me</a>. i made this website with my favorite web framework, sveltekit.
    </p>
    <p use:makeMoreReadable>
        i have other web apps that can be found <a href="https://demoose.vercel.app" target="_blank">here</a>.
    </p>
</section>

<style>
    .float {
        float: left;
        margin: 0 2rem 2rem 0;

        & img {
            width: 300px;
            max-width: 100%;
            filter: invert(1);
            mix-blend-mode: lighten;
        }

        @media (width <= 550px) {
            float: none;
        }
    }

    p {
        max-width: 1000px;
        margin-bottom: 1rem;
    }
</style>