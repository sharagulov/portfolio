<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let movingRect, timeline;

  function restartAnimation() {
    if(timeline) {
      timeline.restart();
    }
  }

  onMount(() => {
    timeline = gsap.timeline();
    timeline
    .to(movingRect, {
        width: "300px", //
        duration: 1,
        ease: "power3.inOut",
      });
  });

  export { restartAnimation };
</script>

<div class="loader">
  <div class="moving-rect" bind:this={movingRect}></div>
</div>

<style>
  .loader {
    width: 300px;
    height: 10px;
    border-radius: 10px;
    border: 2px solid;
    overflow: hidden;
    position: relative;
    z-index: 9999;
  }

  .moving-rect {
    width: 0px;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
