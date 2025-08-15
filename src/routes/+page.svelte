<script lang="ts">
    import FeaturedDugcard from "../components/FeaturedDugcard.svelte";
</script>

<div class="res">
    <section id="featured-dugs">
        <FeaturedDugcard title="I-15 Dream" bgTop={-40} />
        <FeaturedDugcard title="Goos Beyond" bgFilter="invert(1) grayscale(1) contrast(2)"/>
        <FeaturedDugcard title="Big Fish eat Little Fish" bgFilter="invert(1) grayscale(1) brightness(0.7) contrast(5)" />
        <FeaturedDugcard title="Money Snakes" bgTop={-25} />
        <FeaturedDugcard title="Isyiau" />
        <FeaturedDugcard title="Aw Cute" bgFilter="invert(1) grayscale(1) brightness(0.6) contrast(10)" />
        <FeaturedDugcard title="Gabaraptor" bgTop={-25} bgFilter="invert(1) grayscale(1) brightness(0.7) contrast(3)" />
        <FeaturedDugcard title="Volt Welve" bgTop={-25} bgFilter="invert(1) grayscale(1) brightness(0.7) contrast(3)"  />
        <FeaturedDugcard title="Feeble" bgTop={-25} bgFilter="invert(1) grayscale(1) brightness(0.7) contrast(3)" />
    </section>
    <div class="see-all-link">
        <a href="/dugscography">
            <button>see all</button>
        </a>
    </div>
</div>


<style>
    .see-all-link {
        margin-bottom: 1rem;
    }

    .see-all-link button {
        width: 100%;
        padding: 1rem;
        font-size: 1.2rem;
    }
</style>