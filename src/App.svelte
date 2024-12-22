<!-- src/App.svelte -->

<script>
  import { onMount } from "svelte";
  import Main from "./lib/Main.svelte";
  import Loading from "./lib/Loading.svelte";
  import { gsap } from "gsap";

  onMount(() => {
    const timeline = gsap.timeline();
    timeline
      .to(".black-overlay", {
        autoAlpha: 1,
      })
      .to(
        ".black-overlay",
        {
          autoAlpha: 0,
        },
        "+=1"
      );
  });
</script>

<div class="black-overlay">
  <Loading />
</div>

<div class="overlay">
  <Main />
</div>

<style>
  .black-overlay {
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
