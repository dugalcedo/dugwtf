<script lang="ts">
    import { dugs } from "$lib/clientData/dugs";
    import ArtistWithEmoji from "../../components/misc/ArtistWithEmoji.svelte";
    import { openBcPlayer } from "$lib/stores/bcPlayerStore.svelte";

    const thisYear = new Date().getFullYear()
    const firstYear = 2008
    const getYearColor = (year: number) => {
        return `hsl(${255 * ((year-firstYear)/(thisYear/firstYear))}, 75%, 65%)`
    }
</script>

<h2>dugscography</h2>
<br>

<table id="dugscography-table">
    <thead>
        <tr>
            <th class="id"></th>
            <th class="controls"></th>
            <th class="cover"></th>
            <th class="year">year</th>
            <th class="title">title</th>
            <th class="artist">artist</th>
            <th class="type">type</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.values(dugs).filter(x => x.id !== "NULL") as dug}
            <tr>
                <td class="id">{dug.id.replace('DUG','')}</td>
                <td class="controls">
                    <a
                        class="no-flicker" 
                        href="/dugscography/{dug.id}"
                    >
                        <img src="/images/icons/link.svg" alt="link">
                    </a>
                    <button
                        class="no-flicker"
                        onclick={() => openBcPlayer(dug)}
                    >
                        <img src="/images/icons/play.svg" alt="play">
                    </button>
                </td>
                <td class="cover">
                    <a href={dug.cover_l} target="_blank">
                        <img
                            src={dug.cover_s}
                            alt="cover of '{dug.title}' by {dug.artist}"
                        >
                    </a>
                </td>
                <td class="year" style="color: {getYearColor(dug.year)}">{dug.year}</td>
                <td class="title">{dug.title}</td>
                <td class="artist"><ArtistWithEmoji artist={dug.artist} /></td>
                <td class="type">{dug.type}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    tbody > tr:nth-child(even) {
        background-color: var(--fgo05);
    }
    tbody .id {
        text-align: right !important;
        text-align-last: right !important;
    }
    tbody .cover img {
        width: 18px;
        image-rendering: crisp-edges;
    }
    tbody .artist {
        text-align: center !important;
        text-align-last: center !important;
    }
    tbody .controls > * {
        border: 0;
        padding: 0;
    }
    tbody .controls img {
        width: 18px;
    }
</style>