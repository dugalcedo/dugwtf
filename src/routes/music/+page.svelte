<script lang="ts">
    import { makeMoreReadable } from "../../lib/clientUtils/makeMoreReadable";
    import { whatIveMade, dugs, type Dug } from "../../lib/clientData/dugs";
    import DugCard from "../../components/dugs/DugCard.svelte";

    let selectedDugTitle = $state("")

</script>

<h2 class="hl">music i like</h2>

<br>

<a href="/recs">click here</a>

<br>
<br>

<h2 class="hl">my music</h2>

<br>



<section class="what-ive-made-modules">
    {#each whatIveMade as { heading, items } }
        <div class="wim">
            <h4>{heading}</h4>
            <div class="dug-cards">
                {#each items as item}
                {@const dug = item.dug || dugs[0]}
                    <DugCard
                        {dug}
                        filter={item.filter}
                        blend={item.blend}
                        bind:selectedDugTitle={selectedDugTitle}
                    />
                {/each}
            </div>
        </div>
    {/each}
    
    <div class="wim">
        <h4>and much more</h4>
        <br>
        <p>you'll find a lot more stuff on my bandcamps</p>
        <p><a target="_blank" href="https://dugalcedo.bandcamp.com">bandcamp (2019 - present)</a></p>
        <p><a target="_blank" href="https://firstdog.bandcamp.com">bandcamp (2008 - 2018)</a></p>
    </div>
</section>

<style>


    h4 {
        background-color: var(--hl);
        color: var(--bg);
        margin-bottom: 1rem;
        display: inline-block;
    }

    .what-ive-made-modules {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
        width: 1200px;
        max-width: 100%;

        @media (width < 600px) {
            grid-template-columns: 1fr;
        }
    }

    .dug-cards {
        margin-bottom: 2rem;

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (width < 1000px) {
            grid-template-columns: 1fr;
        }
    }


</style>