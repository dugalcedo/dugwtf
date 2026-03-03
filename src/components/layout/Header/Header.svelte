<script>
  import Dot from "../../fun/Dot.svelte";
  import BlorbyText from "../../fun/BlorbyText.svelte";
  import Nav from "./Nav.svelte";
  import Logo from "./Logo.svelte";
  import { page } from "$app/state";
</script>

<header>

  {#if page.data.user}
    <p class="logged-in-as">
      logged in as <em>{page.data.user.displayName}</em>
    </p>
  {/if}

  <a href="/" class="no-flicker">
    <div id="LOGO_AND_MAIN_HEADING">
      <div id="LOGO_CONTAINER">
        <Logo />
      </div>
      <div id="HEADING">
        <h1>dug<Dot/>wtf</h1>
        <BlorbyText text="dug alcedo's website" />
      </div>
    </div>
  </a>

  <Nav />

</header>

<style>
  header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & > a {
      color: unset;
      text-decoration: none;
    }
  }

  .logged-in-as {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.7rem;
    opacity: 0.7;
  }

  #LOGO_AND_MAIN_HEADING {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  #HEADING {
    & h1 {
      position: relative;
      font-size: 2.5rem;
      top: -11px;
    }
  }
  
  :global(#HEADING > .blorby) {
    font-style: italic;
    position: relative;
    left: -30px;
    top: -10px;
  }

  /* WHERE IT STARTS TO LOOK BAD */
  @media (width <= 450px) {
    :global(#LOGO_CONTAINER img) {
      width: 90px !important;
    }

    #HEADING h1 {
      font-size: 2rem;
      top: 0px;
    }

    :global(#HEADING > .blorby) {
      font-size: 1rem;
      top: 0px;
      left: -15px;
    }
  }
</style>