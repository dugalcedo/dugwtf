<script lang="ts">

</script>

<div class="res neodug">
    <h2>neodug</h2>
    <p class="subtitle">Hobby webev made easy</p>
    <p>
        This is where I plan to share various HTML/CSS/JavaScript tools designed with the intention of helping <a href="https://neocities.org" target="_blank">Neocities</a> users improve their websites without having to learn any advanced web development skills.
    </p>
    <p>
        At the moment, I only have one tool available to share: <a href="/neo/commentbox">Commentbox</a>. I've noticed that many Neocities users like to have comment boxes or "guestbooks" on their sites, so I wanted to create a way to easily add one to your site without having to write any JavaScript, and still have it be customizable so you can style it how ever you want to.
    </p>

    <h3>Tools</h3>
    <div class="tools">
        <div class="tool">
            <h4>Commentbox</h4>
            <p>An easy-to-style comment box (aka "guestbook") so your visitors can leave messages on your site.</p>
            <a href="/neo/commentbox">Go &rarr;</a>
        </div>
        <div class="tool">
            <h4>Snippet</h4>
            <p>Load smaller HTML components (e.g. a header) from other files into your web page.</p>
            <a href="/neo/snippet">Go &rarr;</a>
        </div>
    </div>
</div>

<style>
    .subtitle {
        font-style: italic;
    }

    .neodug > p {
        margin-bottom: 1rem;
    }

    .tools {
        display: grid;
        gap: 1rem;
        
        @media (min-width: 650px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (min-width: 1000px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    .tool {
        background-color: rgba(255, 255, 255, 0.05);
        padding: .5rem;

        & p {
            font-size: .8rem;
        }
    }
</style>