<script lang="ts">
    import { makeMoreReadable } from "../../lib/util/makeMoreReadable";
    import { whatIveMade, dugs, type Dug } from "../../lib/clientData/dugs";
    import DugCard from "../../components/dugs/DugCard.svelte";

    let selectedDugTitle = $state("")

</script>

<h2 class="hl">my music</h2>

<br>

<p class="res-left" use:makeMoreReadable>
    between 2008 and 2024, from the ages of 15 to 31, i made a lot of electronic music. since then, i have paused for a few reasons: §<i>1.</i> i have become a little bored, §<i>2.</i> i am feeling more inspired by guitar music these days, §<i>3.</i> i have been devoting a lot of time to learning to program, §<i>4.</i> i want to take the time to expand my skills and styles, learn how to play the guitar, and learn how to record sounds better.
</p>

<br>

<h3 class="hl">what i've made</h3>

<br>

{#each whatIveMade as { heading, items } }
    <div class="wim res-left">
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

<div class="wim res-left">
    <h4>and much more</h4>
    <br>
    <p>you'll find a lot more stuff on my bandcamps</p>
    <p><a target="_blank" href="https://dugalcedo.bandcamp.com">bandcamp (2019 - present)</a></p>
    <p><a target="_blank" href="https://firstdog.bandcamp.com">bandcamp (2008 - 2018)</a></p>
</div>

<style>
    p i {
        color: var(--comp);
        font-style: normal;
    }

    h3 {
        border-bottom: 1px solid var(--hl);
    }

    h4 {
        background-color: var(--hl);
        color: var(--bg);
        margin-bottom: 1rem;
        display: inline-block;
    }

    .dug-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 150px));
        margin-bottom: 2rem;
    }


</style>