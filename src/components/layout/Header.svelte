<script lang="ts">
    import Nav from "./Nav.svelte";

    let headerWidth = $state(0)
</script>

<a href="/" aria-label="Click to go home">
    <header class="mobile" bind:offsetWidth={headerWidth}>
        <img id="toony-moose" src="/images/moose-stamp.png" alt="toony moose" class="black-to-white">
        <h1 style="
            font-size: {headerWidth/10}px;
        ">
            dug alcedo
        </h1>
        <p class="subtitle" style="
            font-size: {headerWidth/25}px;
        ">
            electronic music
        </p>
    </header>
    
    <header class="desktop-flex res">
        <div class="inner">
            <img src="/images/moose-stamp.png" alt="toony-moose" id="toony-moose" class="black-to-white">
            <div>
                <h1>dug alcedo</h1>
                <p>electronic music</p>
            </div>
        </div>
    </header>

</a>

<Nav />

<style>
    a {
        color: var(--white);
        text-decoration: none;
    }

    header.mobile {
        position: relative;
        
        & #toony-moose {
            width: 35%;
        }

        & h1 {
            position: absolute;
            top: 30%;
            left: 38%;
        }

        & .subtitle {
            position: absolute;
            left: 35%;
            top: 67%;
        }
    }

    header.desktop-flex {
        justify-content: center;

        & #toony-moose {
            width: 180px;
        }

        & .inner {
            display: flex;
            align-items: center;
        }

        & h1 {
            position: relative;
            top: 20px;
            left: -30px;
        }

        & p {
            letter-spacing: 5px;
            position: relative;
            top: 20px;
            left: -45px
        }
    }



</style>