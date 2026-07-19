<script lang="ts">
    import { makeMoreReadable } from "../../lib/clientUtils/makeMoreReadable";
    import { whatIveMade, dugs, type Dug } from "../../lib/clientData/dugs";
    import MusicPageItem from "./MusicPageItem.svelte";

    let selectedDugId = $state<string | null>(null)

</script>

<svelte:head>
    <title>Music by Dug Alcedo</title>
</svelte:head>


<h2>my music</h2>

<section id="MY_MUSIC">
    {#each whatIveMade as { heading, items }}
        <div>
            <h3>{heading}</h3>
            <div class="items">
                {#each items as {dug, filter}}
                    <MusicPageItem {dug} {filter} bind:selectedDugId={selectedDugId} />
                {/each}
            </div>
        </div>
    {/each}

    <div>
        <h3>and much more</h3>
        <div class="much-more-links">
            <a href="https://dugalcedo.bandcamp.com" target="_blank">2018 - present</a>
            <a href="https://firstdog.bandcamp.com" target="_blank">2008 - 2018</a>
            <a href="/dugscography">dugscography</a>
        </div>
    </div>
</section>

<style>
    h2 {
        text-align: center;
        margin-bottom: 1rem;
    }

    #MY_MUSIC {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1rem
    }

    #MY_MUSIC>div {
        
        & > h3 {
            background-color: var(--hl);
            color: var(--bg);
            text-align: center;
        }

        & .items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
            padding: 1rem;
            gap: 1rem;
        }

        
    }



    .much-more-links {
        & a {
            display: block;
            text-align: center;
            padding: 1rem 0;

            &:hover {
                background-color: var(--comp);
                color: white;
            }
        }
    }
</style>