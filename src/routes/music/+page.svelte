<script lang="ts">
    import { makeMoreReadable } from "../../lib/clientUtils/makeMoreReadable";
    import { whatIveMade, dugs, type Dug } from "../../lib/clientData/dugs";


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
                {@const alt = `${dug.title} by ${dug.artist}`}
                    <a class="item" href="/dugscography/{dug.id}">
                        {#if dug.hasIcon}
                            <img class="cover" src="/images/album_icons/{dug.id}.png" alt={alt}>
                        {:else}
                            <img 
                                src={dug.cover_s} 
                                alt={alt} 
                                class="cover"
                                style="
                                    filter: {filter};
                                    mix-blend-mode: lighten;
                                "
                            >
                        {/if}
                        <div class="title">
                            <h5>{dug.title}</h5>
                            <p>{dug.year}</p>
                        </div>
                    </a>
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

        & .item {
            position: relative;

            & .cover {
                width: 100%;
            }

            & .title {
                display: none;
                pointer-events: none;
                user-select: none;
                position: absolute;
                top: 50%;
                left: 50%;
                translate: -50% -50%;
                text-align: center;
                background-color: var(--comp);
                color: var(--fg);

                & p {
                    font-size: .7rem;
                }
            }

            &:hover .title {
                display: block;
            }

            &:hover .cover {
                animation: cover 1s linear infinite;
            }
        }
    }

    @keyframes cover {
        0% {
            transform: scaleX(1) scaleY(1);
        }
        25% {
            transform: scaleX(0.9) scaleY(1.1);
        }
        75% {
            transform: scalex(1.1) scaleY(0.9);
        }
        100% {
            transform: scaleX(1) scaleY(1);
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