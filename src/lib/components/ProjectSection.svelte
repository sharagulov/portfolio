<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  export let images = [];

  let carousel;
  let verticalLine;
  let lineTextEl;
  let centerImageInterval;
  let items;

  let infiniteImages = [...images, ...images];

  let itemsRect = [];

  let centerX = window.innerWidth / 4;
  let resizeHandler = () => {
    if (verticalLine) {
      centerX = window.innerWidth / 4;
      verticalLine.style.left = centerX + "px";
      findUnderlineImage(centerX);
    }
  };

  function handleMouseEnter() {
    deleteCenterImage();
    clearInterval(centerImageInterval);
    verticalLine.style.transition = "opacity 0.3s";
    lineTextEl.style.transition = "opacity 0.6s";
    verticalLine.style.opacity = "1";
    lineTextEl.style.opacity = "1";
    findCoordinates();
  }

  function handleMouseLeave() {
    verticalLine.style.transition = "all 0.3s";
    lineTextEl.style.transition = "all 0.3s";
    verticalLine.style.left = centerX + "px";
    lineTextEl.style.left = centerX + 10 + "px";
    centerImageInterval = setInterval(() => {
      findUnderlineImage(centerX);
    }, 100);
  }

  function findCoordinates() {
    itemsRect = Array.from(items).map((item) => {
      const rect = item.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
      };
    });
  }

  function findUnderlineImage(variant, event) {
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      if (variant >= rect.left && variant <= rect.right) {
        item.classList.add("activate");
        lineTextEl.textContent = infiniteImages[index]?.title;
      } else {
        item.classList.remove("activate");
      }
    });
  }

  function deleteCenterImage() {
    items.forEach((item) => {
      item.classList.remove("activate");
    });
  }

  function handleMouseMove(event) {
    const mouseX = event.clientX;
    verticalLine.style.left = mouseX + "px";
    lineTextEl.style.left = mouseX + 10 + "px";
    findUnderlineImage(mouseX);
  }

  function handleScroll(event) {
    const mouseX = event.clientX;
    findUnderlineImage(mouseX);

    event.preventDefault();
    const maxScroll = carousel.scrollWidth / 2;

    gsap.to(carousel, {
      scrollLeft: carousel.scrollLeft + event.deltaY * 10,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        findUnderlineImage(mouseX);
        if (carousel.scrollLeft >= maxScroll) {
          carousel.scrollLeft -= maxScroll;
        } else if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += maxScroll;
        }
      },
      onComplete: () => {
        findUnderlineImage(mouseX);
      },
    });
  }

  onMount(() => {
    items = carousel.querySelectorAll(".carousel-item img");
    window.addEventListener("resize", resizeHandler);
  });

  onDestroy(() => {
    window.removeEventListener("resize", resizeHandler);
    clearInterval(centerImageInterval);
  });
</script>

<div
  class="projects-container"
  on:wheel={handleScroll}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="none"
>
  <div class="carousel" bind:this={carousel}>
    {#each infiniteImages as image, index (index)}
      <div class="carousel-item">
        <img src={image.src} alt={`Project ${index + 1}`} loading="lazy" />
        <p class="small-text">X: {itemsRect[index]?.left}</p>
        <p class="small-text">PRCSN: {itemsRect[index]?.right - 2000}</p>
      </div>
    {/each}
  </div>

  <div class="vertical-line" bind:this={verticalLine}></div>
  <div class="line-text" bind:this={lineTextEl}></div>
</div>

<style>
  .projects-container {
    position: relative;
    display: flex;
    align-items: end;
    height: 100%;
    overflow: hidden;
  }

  .carousel {
    display: flex;
    overflow-x: hidden;
    height: 100%;
    align-items: end;
    z-index: 10;
  }

  .carousel-item {
    padding-bottom: 50px;
    align-content: end;
    flex: 0 0 auto;
    height: 100%;
    overflow: hidden;
    z-index: 10;
    transition: filter 0.5s;
  }

  .carousel-item img {
    max-width: 300px;
    max-height: 200px;
    object-fit: contain;
    filter: brightness(0.5) saturate(0);
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    z-index: 10;
  }

  .carousel-item:hover img,
  :global(.carousel-item img.activate) {
    filter: brightness(1) saturate(1);
    max-width: 400px;
    max-height: 300px;
  }

  .vertical-line {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 2px;
    height: 80%;
    background: white;
    pointer-events: none;
    z-index: 5;
  }

  .line-text {
    top: 0;
    opacity: 0;
    position: absolute;
    pointer-events: none;
    font-size: 15px;
    line-height: 1;
  }

  .small-text {
    font-size: 5px;
  }
</style>
