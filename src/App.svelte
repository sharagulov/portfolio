<script>
  import { onMount } from "svelte";
  import Main from "./lib/Main.svelte";
  import Loading from "./lib/Loading.svelte";
  import { gsap } from "gsap";
  import Shaders from "./lib/Shaders.svelte";

  let showMainContent = false;

  onMount(() => {
    const timeline = gsap.timeline();
    timeline
      .to(".black-overlay", {
        autoAlpha: 1,
        duration: 0.5,
      })
      .to(
        ".black-overlay",
        {
          autoAlpha: 0,
          onComplete: () => {
            showMainContent = true;
          },
        },
        "+=1"
      )
      .to(".main-content", {
        autoAlpha: 1,
        duration: 0.5,
      });
  });
</script>

<!-- <div class="black-overlay">
  <Loading />
</div> -->

<!-- <div class="main-content">
  <Main />
</div> -->

<!-- <Shaders /> -->

<div class="overlay">
  <Main />
</div>

<style>
  .black-overlay {
    opacity: 0;
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

  .main-content {
    opacity: 0;
  }
</style>
